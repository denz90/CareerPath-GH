"""
migrate_v3.py — Incremental migration: adds Central University, Ashesi University,
and AAMUSTED to an existing careerpath.db WITHOUT wiping existing data.

Run from the backend/ directory:
    python migrate_v3.py
"""

import sqlite3
import os
import sys

DB_PATH = "careerpath.db"
V3_SQL  = "../database/careerpath_gh_database_v3_extension.sql"

# ─── helpers ──────────────────────────────────────────────────────────────────

def get_or_create_university(cursor, code, name, short_name, uni_type,
                              location_city, region, website, phone,
                              established, description):
    cursor.execute("SELECT id FROM universities WHERE code = ?", (code,))
    row = cursor.fetchone()
    if row:
        print(f"  [SKIP]   University already exists: {short_name} ({code})")
        return row[0]
    cursor.execute(
        """INSERT INTO universities
               (code, name, short_name, type, location_city, region,
                website, phone, established, description)
           VALUES (?,?,?,?,?,?,?,?,?,?)""",
        (code, name, short_name, uni_type, location_city, region,
         website, phone, established, description)
    )
    uni_id = cursor.lastrowid
    print(f"  [ADD]    University inserted: {short_name} ({code})  id={uni_id}")
    return uni_id


def get_or_create_faculty(cursor, university_id, name, code):
    cursor.execute(
        "SELECT id FROM faculties WHERE university_id=? AND code=?",
        (university_id, code)
    )
    row = cursor.fetchone()
    if row:
        return row[0]
    cursor.execute(
        "INSERT INTO faculties (university_id, name, code) VALUES (?,?,?)",
        (university_id, name, code)
    )
    return cursor.lastrowid


def get_programme_id(cursor, name):
    cursor.execute("SELECT id FROM programmes WHERE name=?", (name,))
    row = cursor.fetchone()
    if not row:
        print(f"  [WARN]   Programme not found: '{name}' — skipping link")
        return None
    return row[0]


def get_or_create_programme(cursor, name, degree_type, duration_years,
                             field_category, riasec_tags, shs_background,
                             core_subjects, elective_subjects,
                             career_outcomes, description):
    pid = get_programme_id(cursor, name)
    if pid:
        print(f"  [SKIP]   Programme already exists: {name}")
        return pid
    cursor.execute(
        """INSERT INTO programmes
               (name, degree_type, duration_years, field_category,
                riasec_tags, shs_background, core_subjects,
                elective_subjects, career_outcomes, description)
           VALUES (?,?,?,?,?,?,?,?,?,?)""",
        (name, degree_type, duration_years, field_category, riasec_tags,
         shs_background, core_subjects, elective_subjects,
         career_outcomes, description)
    )
    pid = cursor.lastrowid
    print(f"  [ADD]    Programme inserted: {name}  id={pid}")
    return pid


def link_programme(cursor, university_id, programme_id,
                   wassce_cutoff, sssce_cutoff, campus, notes):
    if programme_id is None:
        return
    cursor.execute(
        """SELECT id FROM university_programmes
           WHERE university_id=? AND programme_id=? AND campus=?""",
        (university_id, programme_id, campus)
    )
    if cursor.fetchone():
        return  # already linked
    cursor.execute(
        """INSERT INTO university_programmes
               (university_id, programme_id, wassce_cutoff,
                sssce_cutoff, campus, notes)
           VALUES (?,?,?,?,?,?)""",
        (university_id, programme_id, wassce_cutoff,
         sssce_cutoff, campus, notes)
    )


# ─── main migration ───────────────────────────────────────────────────────────

def run_migration():
    if not os.path.exists(DB_PATH):
        print(f"ERROR: {DB_PATH} not found. Run seed_db.py first.")
        sys.exit(1)

    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA foreign_keys = ON")
    cursor = conn.cursor()

    print("\n══════════════════════════════════════════")
    print("  CareerPath GH — Migration v3")
    print("  Adding: Central University, Ashesi, AAMUSTED")
    print("══════════════════════════════════════════\n")

    # ── 1. Universities ────────────────────────────────────────────────────────
    print("▶ Step 1: Universities")

    cu_id = get_or_create_university(
        cursor,
        code="CU",
        name="Central University",
        short_name="Central",
        uni_type="private",
        location_city="Accra",
        region="Greater Accra Region",
        website="https://www.central.edu.gh",
        phone="+233-30-251-0277",
        established=1988,
        description=(
            "A private Christian university founded in 1988 by the Church of Pentecost, "
            "one of Ghana's largest and most reputable private universities. Located in Miotso, "
            "near Tema. Offers programmes in business, law, theology, social sciences, computing, "
            "and health sciences. Accredited by the Ghana Tertiary Education Commission (GTEC). "
            "Known for strong business and law faculties."
        )
    )

    ashesi_id = get_or_create_university(
        cursor,
        code="ASHESI",
        name="Ashesi University",
        short_name="Ashesi",
        uni_type="private",
        location_city="Berekuso",
        region="Eastern Region",
        website="https://www.ashesi.edu.gh",
        phone="+233-30-291-0429",
        established=2002,
        description=(
            "Ghana's leading private liberal arts and engineering university, founded in 2002 "
            "by Patrick Awuah. Located on a residential campus in Berekuso, near Accra. "
            "Recognised globally for its rigorous academic environment, ethics curriculum, and "
            "entrepreneurship culture. Offers Computer Science, Engineering, Business Administration, "
            "and Management Information Systems. Consistently ranked among the best universities in Africa."
        )
    )

    aamusted_id = get_or_create_university(
        cursor,
        code="AAMUSTED",
        name="Akenten Appiah-Menka University of Skills Training and Entrepreneurial Development",
        short_name="AAMUSTED",
        uni_type="public",
        location_city="Kumasi",
        region="Ashanti Region",
        website="https://www.aamusted.edu.gh",
        phone="+233-32-209-8970",
        established=2020,
        description=(
            "Public university formed in 2020 by merging the Kumasi Technical Teachers College "
            "(founded 1962) and the Mampong Technical College of Education (founded 1975). Named "
            "after Dr. Akenten Appiah-Menka, a renowned Ghanaian industrialist and educator. "
            "Focuses on technical and vocational teacher education, entrepreneurship, and skills "
            "training. Primary campuses in Kumasi (Bantama) and Mampong-Ashanti. Strong partner "
            "institution for TVET development in Ghana."
        )
    )

    # ── 2. Faculties ──────────────────────────────────────────────────────────
    print("\n▶ Step 2: Faculties")

    cu_faculties = [
        ("Faculty of Business Administration",              "CU-BUS"),
        ("Faculty of Law",                                  "CU-LAW"),
        ("Faculty of Theology and Mission",                 "CU-THEO"),
        ("Faculty of Social Sciences",                      "CU-SOC"),
        ("Faculty of Information Technology and Communication", "CU-IT"),
        ("Faculty of Health and Allied Sciences",           "CU-HLT"),
    ]
    for fname, fcode in cu_faculties:
        fid = get_or_create_faculty(cursor, cu_id, fname, fcode)
        print(f"  [OK]     Faculty: {fcode}")

    ashesi_faculties = [
        ("Department of Engineering",                   "ASHESI-ENG"),
        ("Department of Computer Science",              "ASHESI-CS"),
        ("Department of Business Administration",       "ASHESI-BUS"),
        ("Department of Management Information Systems","ASHESI-MIS"),
    ]
    for fname, fcode in ashesi_faculties:
        get_or_create_faculty(cursor, ashesi_id, fname, fcode)
        print(f"  [OK]     Faculty: {fcode}")

    aamusted_faculties = [
        ("Faculty of Technical and Vocational Education",       "AAMUSTED-TVE"),
        ("Faculty of Applied Science and Mathematics Education","AAMUSTED-SCI"),
        ("Faculty of Business and Entrepreneurial Development", "AAMUSTED-BUS"),
        ("Faculty of Applied Arts and Technology",              "AAMUSTED-ART"),
    ]
    for fname, fcode in aamusted_faculties:
        get_or_create_faculty(cursor, aamusted_id, fname, fcode)
        print(f"  [OK]     Faculty: {fcode}")

    # ── 3. New programmes ─────────────────────────────────────────────────────
    print("\n▶ Step 3: New Programmes")

    theology_id = get_or_create_programme(
        cursor,
        name="Theology and Mission Studies",
        degree_type="BA",
        duration_years=4,
        field_category="Arts & Social Sciences",
        riasec_tags="S,I,A",
        shs_background="General Arts, General Science, Business, Home Economics, Technical",
        core_subjects="English Language, Core Mathematics, Social Studies",
        elective_subjects="Religious Studies (or any two electives)",
        career_outcomes=(
            "Pastor, Missionary, Chaplain, Religious Education Teacher, "
            "NGO Programme Officer, Community Developer"
        ),
        description=(
            "Covers biblical studies, Christian theology, church history, ethics, and "
            "cross-cultural mission. Offered at Central University. All SHS backgrounds "
            "accepted with credit passes in English and Maths. Combines faith-based learning "
            "with academic rigour."
        )
    )

    mis_id = get_or_create_programme(
        cursor,
        name="Management Information Systems",
        degree_type="BSc",
        duration_years=4,
        field_category="Computing & IT",
        riasec_tags="I,E,C",
        shs_background="General Science, Business, Technical, General Arts",
        core_subjects="English Language, Core Mathematics, Integrated Science (or Social Studies)",
        elective_subjects="Elective Mathematics, ICT (or Economics), any one elective",
        career_outcomes=(
            "IT Manager, Business Analyst, Systems Analyst, Data Analyst, "
            "ERP Consultant, IT Consultant"
        ),
        description=(
            "Bridges business and technology, covering information systems design, database "
            "management, enterprise resource planning (ERP), and digital strategy. Highly "
            "employable degree linking IT skills to business management. Signature programme "
            "at Ashesi University."
        )
    )

    entrepreneurship_id = get_or_create_programme(
        cursor,
        name="Entrepreneurship and Innovation",
        degree_type="BSc",
        duration_years=4,
        field_category="Business",
        riasec_tags="E,I,S",
        shs_background="Business, General Arts, General Science, Technical, Home Economics",
        core_subjects="English Language, Core Mathematics, Social Studies",
        elective_subjects="Economics (or Business Management), any two electives",
        career_outcomes=(
            "Entrepreneur, Start-up Founder, Business Developer, Innovation Consultant, "
            "SME Manager, Venture Capital Analyst"
        ),
        description=(
            "Focuses on identifying business opportunities, developing business models, "
            "accessing funding, and managing start-up ventures. Covers design thinking, lean "
            "methodology, and social entrepreneurship. Strongly aligned with AAMUSTED's mandate "
            "and Ashesi's entrepreneurial culture."
        )
    )

    # ── 4. University–Programme links ─────────────────────────────────────────
    print("\n▶ Step 4: Programme links")

    # Central University links
    cu_campus = "Miotso Campus, Tema"
    cu_links = [
        ("Business Administration (Accounting & Banking)", 24, 16,
         "BSc Business Administration — Accounting. One of Central's flagship programmes. "
         "Business or General Arts background preferred. Leads to ICAG and ACCA pathways."),
        ("Business Administration (Marketing)", 24, 16,
         "BSc Business Administration — Marketing. All backgrounds accepted."),
        ("Business Administration (Human Resource Management)", 24, 16, None),
        ("Business Administration (Logistics & Supply Chain)", 24, 16, None),
        ("Accounting", 24, 16,
         "BSc Accounting. Business or General Arts background required."),
        ("Law (LLB)", 24, 16,
         "LLB Law. One of Central University's most competitive programmes. "
         "All SHS backgrounds accepted with strong English and Maths. "
         "FIRST CHOICE programme advised. Leads to Ghana School of Law entrance."),
        ("Economics", 24, 16,
         "BA Economics. General Arts or Business background preferred."),
        ("Political Science", 24, 16, None),
        ("Sociology and Social Work", 24, 16,
         "BSc Social Work. Community development focus. All backgrounds accepted."),
        ("Psychology", 24, 16, None),
        ("Information Technology", 24, 16,
         "BSc Information Technology. Technical or Science background preferred."),
        ("Computer Science", 24, 16,
         "BSc Computer Science. Elective Mathematics required."),
        ("Public Health", 24, 16,
         "BSc Public Health. Science background preferred."),
        ("Nursing", 24, 16,
         "BSc Nursing. Science background required. Biology and Chemistry mandatory."),
        ("Theology and Mission Studies", 36, 24,
         "BA Theology and Mission Studies. Central University is a Christian institution. "
         "All SHS backgrounds accepted. Scholarship opportunities available for ministry-bound students."),
    ]
    for prog_name, wassce, sssce, notes in cu_links:
        pid = get_programme_id(cursor, prog_name)
        link_programme(cursor, cu_id, pid, wassce, sssce, cu_campus, notes)
        print(f"  [LINK]   CU ← {prog_name}")

    # Ashesi University links
    ashesi_campus = "Berekuso Campus, Eastern Region"
    ashesi_links = [
        ("Computer Science", 24, 16,
         "BSc Computer Science. One of Ashesi's flagship programmes. Holistic assessment "
         "— essays, interview, academic record. Elective Mathematics strongly required. "
         "Ethics and leadership core curriculum embedded in all degrees."),
        ("Computer Engineering", 24, 16,
         "BSc Computer Engineering. Physics and Elective Mathematics required. "
         "Accredited by Ghanaian and US engineering bodies. Design projects and capstone required."),
        ("Electrical and Electronic Engineering", 24, 16,
         "BSc Electrical and Electronic Engineering. One of very few private universities "
         "in Ghana offering accredited Engineering. Physics, Elective Maths, Chemistry required."),
        ("Mechanical Engineering", 24, 16,
         "BSc Mechanical Engineering. Physics and Elective Maths required. "
         "Strong hands-on engineering design projects."),
        ("Business Administration (Marketing)", 24, 16,
         "BSc Business Administration. Ethics and entrepreneurship embedded. "
         "Case-study and project-based learning. All SHS backgrounds accepted."),
        ("Business Administration (Accounting & Banking)", 24, 16,
         "BSc Business Administration — Accounting. Strong quantitative focus. "
         "Elective Maths helpful but not mandatory."),
        ("Management Information Systems", 24, 16,
         "BSc Management Information Systems. Bridges business and IT. "
         "All SHS backgrounds considered. Focus on data analytics, ERP, digital transformation."),
        ("Entrepreneurship and Innovation", 24, 16,
         "BSc Entrepreneurship. Ashesi's ethos centres on building ethical leaders and "
         "entrepreneurs. All backgrounds welcome. Venture Lab and incubator support on campus."),
    ]
    for prog_name, wassce, sssce, notes in ashesi_links:
        pid = get_programme_id(cursor, prog_name)
        link_programme(cursor, ashesi_id, pid, wassce, sssce, ashesi_campus, notes)
        print(f"  [LINK]   Ashesi ← {prog_name}")

    # AAMUSTED links
    aamusted_links = [
        ("Technical and Vocational Education", 36, 24, "Kumasi (Bantama) Campus",
         "BEd Technical and Vocational Education. AAMUSTED's primary specialisation. "
         "Technical, Visual Arts, or Home Economics background required. Trains TVET teachers. "
         "One of the few universities in Ghana with a dedicated TVET teacher education programme."),
        ("Technical and Vocational Education", 36, 24, "Mampong-Ashanti Campus",
         "BEd Technical and Vocational Education — Mampong campus. "
         "Separate intake. Same programme with practical workshop facilities."),
        ("Home Economics Education", 36, 24, "Kumasi (Bantama) Campus",
         "BEd Home Economics Education. Home Economics background strongly preferred. "
         "Covers Food & Nutrition, Clothing & Textiles, Family Life, and pedagogy."),
        ("Clothing and Textiles Education", 36, 24, "Kumasi (Bantama) Campus",
         "BEd Clothing and Textiles Education. Home Economics or Visual Arts preferred."),
        ("Mathematics Education", 36, 24, "Kumasi (Bantama) Campus",
         "BEd Mathematics Education. Science or General Arts (with Elective Maths) required."),
        ("Science Education", 36, 24, "Kumasi (Bantama) Campus",
         "BEd Science Education. General Science background required."),
        ("ICT Education", 36, 24, "Kumasi (Bantama) Campus",
         "BEd ICT Education. Technical or Science background preferred."),
        ("English Language Education", 36, 24, "Mampong-Ashanti Campus",
         "BEd English Language Education. General Arts background preferred."),
        ("Fashion Design and Textiles", 36, 24, "Kumasi (Bantama) Campus",
         "BTech Fashion Design and Textiles. Visual Arts or Home Economics background preferred."),
        ("Entrepreneurship and Innovation", 36, 24, "Kumasi (Bantama) Campus",
         "BSc Entrepreneurship and Innovation. Central to AAMUSTED's mandate of skills training "
         "and entrepreneurial development. All SHS backgrounds accepted. Focus on SMEs."),
        ("Accounting", 36, 24, "Kumasi (Bantama) Campus",
         "BSc Accounting. Business or General Arts background preferred."),
    ]
    for prog_name, wassce, sssce, campus, notes in aamusted_links:
        pid = get_programme_id(cursor, prog_name)
        link_programme(cursor, aamusted_id, pid, wassce, sssce, campus, notes)
        print(f"  [LINK]   AAMUSTED ← {prog_name} @ {campus}")

    # ── commit ────────────────────────────────────────────────────────────────
    conn.commit()
    conn.close()

    print("\n══════════════════════════════════════════")
    print("  ✅  Migration v3 complete!")
    print("  Added: Central University, Ashesi University, AAMUSTED")
    print("══════════════════════════════════════════\n")


if __name__ == "__main__":
    run_migration()
