-- ============================================================
--  CareerPath GH — DATABASE EXTENSION v3
--  Adding Three Additional Institutions
--
--  NEW INSTITUTIONS ADDED:
--    - Central University (CU) — Private Christian University
--    - Ashesi University (ASHESI) — Private Liberal Arts & Engineering
--    - Akenten Appiah-Menka University of Skills Training
--      and Entrepreneurial Development (AAMUSTED) — Public
--
--  This file EXTENDS the base and v2 extension files.
--  Run AFTER both careerpath_gh_database.sql
--  AND careerpath_gh_database_v2_extension.sql.
-- ============================================================


-- ============================================================
--  STEP 1: ADD NEW INSTITUTIONS
-- ============================================================

INSERT INTO universities (code, name, short_name, type, location_city, region, website, phone, established, description) VALUES

('CU',
 'Central University',
 'Central', 'private', 'Accra', 'Greater Accra Region',
 'https://www.central.edu.gh', '+233-30-251-0277', 1988,
 'A private Christian university founded in 1988 by the Church of Pentecost, one of Ghana''s largest and most reputable private universities. Located in Miotso, near Tema. Offers programmes in business, law, theology, social sciences, computing, and health sciences. Accredited by the Ghana Tertiary Education Commission (GTEC). Known for strong business and law faculties.'),

('ASHESI',
 'Ashesi University',
 'Ashesi', 'private', 'Berekuso', 'Eastern Region',
 'https://www.ashesi.edu.gh', '+233-30-291-0429', 2002,
 'Ghana''s leading private liberal arts and engineering university, founded in 2002 by Patrick Awuah. Located on a residential campus in Berekuso, near Accra. Recognised globally for its rigorous academic environment, ethics curriculum, and entrepreneurship culture. Offers Computer Science, Engineering, Business Administration, and Management Information Systems. Consistently ranked among the best universities in Africa.'),

('AAMUSTED',
 'Akenten Appiah-Menka University of Skills Training and Entrepreneurial Development',
 'AAMUSTED', 'public', 'Kumasi', 'Ashanti Region',
 'https://www.aamusted.edu.gh', '+233-32-209-8970', 2020,
 'Public university formed in 2020 by merging the Kumasi Technical Teachers College (founded 1962) and the Mampong Technical College of Education (founded 1975). Named after Dr. Akenten Appiah-Menka, a renowned Ghanaian industrialist and educator. Focuses on technical and vocational teacher education, entrepreneurship, and skills training. Primary campuses in Kumasi (Bantama) and Mampong-Ashanti. Strong partner institution for TVET development in Ghana.');


-- ============================================================
--  STEP 2: ADD FACULTIES FOR NEW INSTITUTIONS
-- ============================================================

INSERT INTO faculties (university_id, name, code) VALUES

-- Central University
((SELECT id FROM universities WHERE code='CU'), 'Faculty of Business Administration', 'CU-BUS'),
((SELECT id FROM universities WHERE code='CU'), 'Faculty of Law', 'CU-LAW'),
((SELECT id FROM universities WHERE code='CU'), 'Faculty of Theology and Mission', 'CU-THEO'),
((SELECT id FROM universities WHERE code='CU'), 'Faculty of Social Sciences', 'CU-SOC'),
((SELECT id FROM universities WHERE code='CU'), 'Faculty of Information Technology and Communication', 'CU-IT'),
((SELECT id FROM universities WHERE code='CU'), 'Faculty of Health and Allied Sciences', 'CU-HLT'),

-- Ashesi University
((SELECT id FROM universities WHERE code='ASHESI'), 'Department of Engineering', 'ASHESI-ENG'),
((SELECT id FROM universities WHERE code='ASHESI'), 'Department of Computer Science', 'ASHESI-CS'),
((SELECT id FROM universities WHERE code='ASHESI'), 'Department of Business Administration', 'ASHESI-BUS'),
((SELECT id FROM universities WHERE code='ASHESI'), 'Department of Management Information Systems', 'ASHESI-MIS'),

-- AAMUSTED
((SELECT id FROM universities WHERE code='AAMUSTED'), 'Faculty of Technical and Vocational Education', 'AAMUSTED-TVE'),
((SELECT id FROM universities WHERE code='AAMUSTED'), 'Faculty of Applied Science and Mathematics Education', 'AAMUSTED-SCI'),
((SELECT id FROM universities WHERE code='AAMUSTED'), 'Faculty of Business and Entrepreneurial Development', 'AAMUSTED-BUS'),
((SELECT id FROM universities WHERE code='AAMUSTED'), 'Faculty of Applied Arts and Technology', 'AAMUSTED-ART');


-- ============================================================
--  STEP 3: ADD NEW PROGRAMMES (where not already in database)
-- ============================================================

INSERT INTO programmes (name, degree_type, duration_years, field_category, riasec_tags, shs_background, core_subjects, elective_subjects, career_outcomes, description) VALUES

-- ── THEOLOGY & MINISTRY ───────────────────────────────────────

('Theology and Mission Studies',
 'BA', 4, 'Arts & Social Sciences', 'S,I,A',
 'General Arts, General Science, Business, Home Economics, Technical',
 'English Language, Core Mathematics, Social Studies',
 'Religious Studies (or any two electives)',
 'Pastor, Missionary, Chaplain, Religious Education Teacher, NGO Programme Officer, Community Developer',
 'Covers biblical studies, Christian theology, church history, ethics, and cross-cultural mission. Offered at Central University. All SHS backgrounds accepted with credit passes in English and Maths. Combines faith-based learning with academic rigour.'),

-- ── MANAGEMENT INFORMATION SYSTEMS ───────────────────────────

('Management Information Systems',
 'BSc', 4, 'Computing & IT', 'I,E,C',
 'General Science, Business, Technical, General Arts',
 'English Language, Core Mathematics, Integrated Science (or Social Studies)',
 'Elective Mathematics, ICT (or Economics), any one elective',
 'IT Manager, Business Analyst, Systems Analyst, Data Analyst, ERP Consultant, IT Consultant',
 'Bridges business and technology, covering information systems design, database management, enterprise resource planning (ERP), and digital strategy. Highly employable degree linking IT skills to business management. Signature programme at Ashesi University.'),

-- ── ENTREPRENEURSHIP ─────────────────────────────────────────

('Entrepreneurship and Innovation',
 'BSc', 4, 'Business', 'E,I,S',
 'Business, General Arts, General Science, Technical, Home Economics',
 'English Language, Core Mathematics, Social Studies',
 'Economics (or Business Management), any two electives',
 'Entrepreneur, Start-up Founder, Business Developer, Innovation Consultant, SME Manager, Venture Capital Analyst',
 'Focuses on identifying business opportunities, developing business models, accessing funding, and managing start-up ventures. Covers design thinking, lean methodology, and social entrepreneurship. Strongly aligned with AAMUSTED''s mandate and Ashesi''s entrepreneurial culture.');


-- ============================================================
--  STEP 4: UNIVERSITY-PROGRAMME LINKS
-- ============================================================

-- ── Central University (CU) ──────────────────────────────────
-- Source: Central University website; WASSCE aggregate ≤ 36 general;
-- competitive programmes closer to 24.
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Business Administration (Accounting & Banking)'),
 24, 16, 'Miotso Campus, Tema',
 'BSc Business Administration — Accounting. One of Central''s flagship programmes. Business or General Arts background preferred. Leads to ICAG and ACCA pathways.'),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Business Administration (Marketing)'),
 24, 16, 'Miotso Campus, Tema',
 'BSc Business Administration — Marketing. All backgrounds accepted with appropriate passes.'),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Business Administration (Human Resource Management)'),
 24, 16, 'Miotso Campus, Tema',
 NULL),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Business Administration (Logistics & Supply Chain)'),
 24, 16, 'Miotso Campus, Tema',
 NULL),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Accounting'),
 24, 16, 'Miotso Campus, Tema',
 'BSc Accounting. Business or General Arts background required.'),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Law (LLB)'),
 24, 16, 'Miotso Campus, Tema',
 'LLB Law. One of Central University''s most competitive programmes. All SHS backgrounds accepted with strong English and Maths. FIRST CHOICE programme advised. Leads to Ghana School of Law entrance.'),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Economics'),
 24, 16, 'Miotso Campus, Tema',
 'BA Economics. General Arts or Business background preferred.'),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Political Science'),
 24, 16, 'Miotso Campus, Tema',
 NULL),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Sociology and Social Work'),
 24, 16, 'Miotso Campus, Tema',
 'BSc Social Work. Community development focus. All backgrounds accepted.'),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Psychology'),
 24, 16, 'Miotso Campus, Tema',
 NULL),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Information Technology'),
 24, 16, 'Miotso Campus, Tema',
 'BSc Information Technology. Technical or Science background preferred.'),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Computer Science'),
 24, 16, 'Miotso Campus, Tema',
 'BSc Computer Science. Elective Mathematics required.'),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Public Health'),
 24, 16, 'Miotso Campus, Tema',
 'BSc Public Health. Science background preferred. All backgrounds may apply.'),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Nursing'),
 24, 16, 'Miotso Campus, Tema',
 'BSc Nursing. Science background required. Biology and Chemistry mandatory.'),

((SELECT id FROM universities WHERE code='CU'),
 (SELECT id FROM programmes WHERE name='Theology and Mission Studies'),
 36, 24, 'Miotso Campus, Tema',
 'BA Theology and Mission Studies. Central University is a Christian institution. All SHS backgrounds accepted. Scholarship opportunities available for ministry-bound students.');


-- ── Ashesi University (ASHESI) ────────────────────────────────
-- Source: Ashesi University admissions; unique holistic process
-- No rigid aggregate cut-off — portfolio, interview, essays required.
-- Using aggregate ≤ 24 as a general guide (highly selective).
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

((SELECT id FROM universities WHERE code='ASHESI'),
 (SELECT id FROM programmes WHERE name='Computer Science'),
 24, 16, 'Berekuso Campus, Eastern Region',
 'BSc Computer Science. One of Ashesi''s flagship programmes. Highly competitive — applicants assessed holistically through essays, interview, and academic record. Elective Mathematics strongly required. Liberal arts core curriculum (ethics, leadership) is embedded in all degrees.'),

((SELECT id FROM universities WHERE code='ASHESI'),
 (SELECT id FROM programmes WHERE name='Computer Engineering'),
 24, 16, 'Berekuso Campus, Eastern Region',
 'BSc Computer Engineering. Physics and Elective Mathematics required. Ashesi Engineering is accredited by the Ghanaian and US engineering accreditation bodies. Design projects and capstone required.'),

((SELECT id FROM universities WHERE code='ASHESI'),
 (SELECT id FROM programmes WHERE name='Electrical and Electronic Engineering'),
 24, 16, 'Berekuso Campus, Eastern Region',
 'BSc Electrical and Electronic Engineering. Ashesi is one of very few private universities in Ghana offering accredited Engineering. Physics, Elective Maths, and Chemistry required.'),

((SELECT id FROM universities WHERE code='ASHESI'),
 (SELECT id FROM programmes WHERE name='Mechanical Engineering'),
 24, 16, 'Berekuso Campus, Eastern Region',
 'BSc Mechanical Engineering. Science background with Physics and Elective Maths required. Strong hands-on engineering design projects.'),

((SELECT id FROM universities WHERE code='ASHESI'),
 (SELECT id FROM programmes WHERE name='Business Administration (Marketing)'),
 24, 16, 'Berekuso Campus, Eastern Region',
 'BSc Business Administration (Marketing). All SHS backgrounds accepted. Ashesi''s business curriculum is infused with ethics and entrepreneurship. Case-study and project-based learning approach.'),

((SELECT id FROM universities WHERE code='ASHESI'),
 (SELECT id FROM programmes WHERE name='Business Administration (Accounting & Banking)'),
 24, 16, 'Berekuso Campus, Eastern Region',
 'BSc Business Administration (Accounting). Strong quantitative focus. Elective Maths helpful but not mandatory.'),

((SELECT id FROM universities WHERE code='ASHESI'),
 (SELECT id FROM programmes WHERE name='Management Information Systems'),
 24, 16, 'Berekuso Campus, Eastern Region',
 'BSc Management Information Systems. Unique programme bridging business and IT. All SHS backgrounds considered. Strong emphasis on data analytics, ERP, and digital transformation.'),

((SELECT id FROM universities WHERE code='ASHESI'),
 (SELECT id FROM programmes WHERE name='Entrepreneurship and Innovation'),
 24, 16, 'Berekuso Campus, Eastern Region',
 'BSc Entrepreneurship. Ashesi''s ethos centres on building ethical leaders and entrepreneurs. All backgrounds welcome. Venture Lab and incubator support available on campus.');


-- ── AAMUSTED ────────────────────────────────────────────────────
-- Source: AAMUSTED official website; WASSCE aggregate ≤ 36 general
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

((SELECT id FROM universities WHERE code='AAMUSTED'),
 (SELECT id FROM programmes WHERE name='Technical and Vocational Education'),
 36, 24, 'Kumasi (Bantama) Campus',
 'BEd Technical and Vocational Education. AAMUSTED''s primary specialisation. Technical, Visual Arts, or Home Economics background required. Trains TVET teachers and instructors. One of the few universities in Ghana with a dedicated TVET teacher education programme.'),

((SELECT id FROM universities WHERE code='AAMUSTED'),
 (SELECT id FROM programmes WHERE name='Technical and Vocational Education'),
 36, 24, 'Mampong-Ashanti Campus',
 'BEd Technical and Vocational Education — Mampong campus. Separate intake. Same programme with practical workshop facilities.'),

((SELECT id FROM universities WHERE code='AAMUSTED'),
 (SELECT id FROM programmes WHERE name='Home Economics Education'),
 36, 24, 'Kumasi (Bantama) Campus',
 'BEd Home Economics Education. Home Economics background strongly preferred. Covers Food & Nutrition, Clothing & Textiles, Family Life, and pedagogy for JHS/SHS teaching.'),

((SELECT id FROM universities WHERE code='AAMUSTED'),
 (SELECT id FROM programmes WHERE name='Clothing and Textiles Education'),
 36, 24, 'Kumasi (Bantama) Campus',
 'BEd Clothing and Textiles Education. Home Economics or Visual Arts background preferred. Practical garment construction and fashion pedagogy.'),

((SELECT id FROM universities WHERE code='AAMUSTED'),
 (SELECT id FROM programmes WHERE name='Mathematics Education'),
 36, 24, 'Kumasi (Bantama) Campus',
 'BEd Mathematics Education. Science or General Arts (with Elective Maths) background required.'),

((SELECT id FROM universities WHERE code='AAMUSTED'),
 (SELECT id FROM programmes WHERE name='Science Education'),
 36, 24, 'Kumasi (Bantama) Campus',
 'BEd Science Education. General Science background required.'),

((SELECT id FROM universities WHERE code='AAMUSTED'),
 (SELECT id FROM programmes WHERE name='ICT Education'),
 36, 24, 'Kumasi (Bantama) Campus',
 'BEd ICT Education. Technical or Science background preferred.'),

((SELECT id FROM universities WHERE code='AAMUSTED'),
 (SELECT id FROM programmes WHERE name='English Language Education'),
 36, 24, 'Mampong-Ashanti Campus',
 'BEd English Language Education. General Arts background preferred.'),

((SELECT id FROM universities WHERE code='AAMUSTED'),
 (SELECT id FROM programmes WHERE name='Fashion Design and Textiles'),
 36, 24, 'Kumasi (Bantama) Campus',
 'BTech Fashion Design and Textiles. Visual Arts or Home Economics background preferred. Practical portfolio may be required.'),

((SELECT id FROM universities WHERE code='AAMUSTED'),
 (SELECT id FROM programmes WHERE name='Entrepreneurship and Innovation'),
 36, 24, 'Kumasi (Bantama) Campus',
 'BSc Entrepreneurship and Innovation. Central to AAMUSTED''s mandate of skills training and entrepreneurial development. All SHS backgrounds accepted. Focus on small and medium enterprises (SMEs) in the Ghanaian context.'),

((SELECT id FROM universities WHERE code='AAMUSTED'),
 (SELECT id FROM programmes WHERE name='Accounting'),
 36, 24, 'Kumasi (Bantama) Campus',
 'BSc Accounting. Business or General Arts background preferred.');


-- ============================================================
--  END OF EXTENSION v3
-- ============================================================
