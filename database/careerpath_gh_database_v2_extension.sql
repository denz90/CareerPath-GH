-- ============================================================
--  CareerPath GH — DATABASE EXTENSION v2
--  Covering: All SHS Tracks + Specialist Institutions
--
--  NEW SHS TRACKS ADDED:
--    - Technical / Vocational
--    - Visual Arts
--    - Home Economics (incl. Clothing & Textiles / Food & Nutrition)
--    - Business (expanded)
--    - General Arts (expanded)
--
--  NEW INSTITUTIONS ADDED:
--    - UniMAC (formerly GIJ) — Journalism & Media
--    - NAFTI (Film & Television)
--    - Kumasi Technical University (KTU)
--    - Accra Technical University (ATU)
--    - Takoradi Technical University (TTU)
--    - Ho Technical University (HTU)
--    - Cape Coast Technical University (CCTU)
--    - Joyce Ababio College of Creative Design (Fashion)
--    - Kumasi College of Art (KNUST sub-institution)
--    - National Vocational Training Institute (NVTI) pathway note
--    - Accra Nursing Training College (representative)
--
--  This file EXTENDS the base careerpath_gh_database.sql
--  Run AFTER the base seed file.
-- ============================================================


-- ============================================================
--  STEP 1: ADD NEW INSTITUTIONS
-- ============================================================

INSERT INTO universities (code, name, short_name, type, location_city, region, website, phone, established, description) VALUES

('UNIMAC',
 'University of Media, Arts and Communication (formerly Ghana Institute of Journalism)',
 'UniMAC / GIJ', 'public', 'Accra', 'Greater Accra Region',
 'https://www.unimac.edu.gh', '+233-30-277-3655', 1959,
 'Ghana''s only public specialist university for media, journalism, communication, film, and languages. Formed by merging GIJ (1959), NAFTI (1978), and Ghana Institute of Languages (1961) into a single university by Act of Parliament in 2022. All SHS backgrounds accepted.'),

('KTU',
 'Kumasi Technical University',
 'KTU', 'technical', 'Kumasi', 'Ashanti Region',
 'https://www.kstu.edu.gh', '+233-32-209-4012', 1954,
 'One of the oldest technical universities in Ghana, established in 1954. Offers Bachelor of Technology (BTech) and HND programmes in engineering, fashion, business, hospitality, and applied sciences. Accepts Technical, Visual Arts, and Home Economics students.'),

('ATU',
 'Accra Technical University',
 'ATU', 'technical', 'Accra', 'Greater Accra Region',
 'https://www.atu.edu.gh', '+233-30-266-1900', 1949,
 'One of Ghana''s oldest tertiary institutions, established in 1949. Offers HND and BTech programmes across engineering, computing, business, hospitality, and fashion. Strong industry partnerships and practical training focus. Located in central Accra.'),

('TTU',
 'Takoradi Technical University',
 'TTU', 'technical', 'Takoradi', 'Western Region',
 'https://www.ttu.edu.gh', '+233-31-202-3862', 1954,
 'A leading technical university in western Ghana offering BTech and HND programmes in engineering, oil and gas, nautical science, computing, and hospitality. Well-positioned near Ghana''s oil-producing region.'),

('HTU',
 'Ho Technical University',
 'HTU', 'technical', 'Ho', 'Volta Region',
 'https://www.htu.edu.gh', '+233-36-209-3094', 1968,
 'Technical university in Ho serving the Volta Region. Offers BTech and HND programmes in engineering, computing, fashion, hospitality, and business.'),

('CCTU',
 'Cape Coast Technical University',
 'CCTU', 'technical', 'Cape Coast', 'Central Region',
 'https://www.cctu.edu.gh', '+233-33-209-1700', 1984,
 'Technical university offering BTech and HND programmes in engineering, fashion design, hospitality, and business. Located in Cape Coast, Central Region.'),

('JAACD',
 'Joyce Ababio College of Creative Design',
 'Joyce Ababio', 'private', 'Accra', 'Greater Accra Region',
 'https://www.joyceababio.com', '+233-30-278-4747', 2005,
 'Ghana''s premier private fashion and creative design college. Named after renowned Ghanaian fashion designer Joyce Ababio. Offers diploma and degree-level programmes in fashion design, textile arts, and creative entrepreneurship. Accepts all SHS backgrounds.'),

('RADFORD',
 'Radford University College',
 'Radford', 'private', 'Accra', 'Greater Accra Region',
 'https://www.radford.edu.gh', '+233-30-296-5168', 2009,
 'Private university college in Accra offering degrees in fashion design, business, computing, and health sciences. Accredited by the National Accreditation Board. Known for its Fashion Design programme and creative arts focus.'),

('ANTTC',
 'Accra Nursing and Midwifery Training College (representative)',
 'Nursing Training Colleges', 'public', 'Accra', 'Greater Accra Region',
 'https://www.moh.gov.gh', '+233-30-266-5421', 1945,
 'Represents the network of public Nursing and Midwifery Training Colleges across Ghana under the Ministry of Health. Colleges are located in most regional capitals. Offers Certificate programmes (3 years) in Nursing and Midwifery for SHS science students.');


-- ============================================================
--  STEP 2: ADD NEW FACULTIES FOR NEW INSTITUTIONS
-- ============================================================

INSERT INTO faculties (university_id, name, code) VALUES
-- UniMAC
((SELECT id FROM universities WHERE code='UNIMAC'), 'Institute of Journalism (GIJ)', 'UNIMAC-IJ'),
((SELECT id FROM universities WHERE code='UNIMAC'), 'National Film and Television Institute (NAFTI)', 'UNIMAC-NAFTI'),
((SELECT id FROM universities WHERE code='UNIMAC'), 'Ghana Institute of Languages (GIL)', 'UNIMAC-GIL'),

-- KTU
((SELECT id FROM universities WHERE code='KTU'), 'Faculty of Engineering Technology', 'KTU-ENG'),
((SELECT id FROM universities WHERE code='KTU'), 'Faculty of Applied Arts and Technology', 'KTU-AAT'),
((SELECT id FROM universities WHERE code='KTU'), 'Faculty of Business and Management Studies', 'KTU-BUS'),
((SELECT id FROM universities WHERE code='KTU'), 'Faculty of Applied Sciences and Technology', 'KTU-SCI'),

-- ATU
((SELECT id FROM universities WHERE code='ATU'), 'Faculty of Engineering', 'ATU-ENG'),
((SELECT id FROM universities WHERE code='ATU'), 'Faculty of Applied Arts', 'ATU-ART'),
((SELECT id FROM universities WHERE code='ATU'), 'Faculty of Business', 'ATU-BUS'),
((SELECT id FROM universities WHERE code='ATU'), 'Faculty of Computing and IT', 'ATU-IT'),

-- TTU
((SELECT id FROM universities WHERE code='TTU'), 'Faculty of Engineering', 'TTU-ENG'),
((SELECT id FROM universities WHERE code='TTU'), 'School of Business', 'TTU-BUS'),
((SELECT id FROM universities WHERE code='TTU'), 'Faculty of Computing', 'TTU-IT'),

-- HTU
((SELECT id FROM universities WHERE code='HTU'), 'Faculty of Engineering Technology', 'HTU-ENG'),
((SELECT id FROM universities WHERE code='HTU'), 'Faculty of Applied Arts', 'HTU-ART'),

-- CCTU
((SELECT id FROM universities WHERE code='CCTU'), 'School of Engineering', 'CCTU-ENG'),
((SELECT id FROM universities WHERE code='CCTU'), 'School of Applied Arts', 'CCTU-ART'),

-- Joyce Ababio
((SELECT id FROM universities WHERE code='JAACD'), 'School of Fashion Design', 'JAACD-FASH'),
((SELECT id FROM universities WHERE code='JAACD'), 'School of Textile Arts', 'JAACD-TEXT'),

-- Radford
((SELECT id FROM universities WHERE code='RADFORD'), 'School of Fashion and Design', 'RADFORD-FASH'),
((SELECT id FROM universities WHERE code='RADFORD'), 'School of Business', 'RADFORD-BUS');


-- ============================================================
--  STEP 3: ADD NEW PROGRAMMES (all SHS tracks)
-- ============================================================

INSERT INTO programmes (name, degree_type, duration_years, field_category, riasec_tags, shs_background, core_subjects, elective_subjects, career_outcomes, description) VALUES

-- ── MEDIA, JOURNALISM & COMMUNICATION ────────────────────────

('Journalism',
 'BA', 4, 'Media & Communication', 'A,S,E',
 'General Arts, Business, General Science, Visual Arts, Home Economics, Technical',
 'English Language, Core Mathematics, Social Studies',
 'Any two elective subjects; Literature in English or Government preferred',
 'News Reporter, Broadcast Journalist, Editor, Online Journalist, Investigative Reporter, Media Manager',
 'Covers news writing, broadcast journalism, media law, investigative reporting, digital journalism, and media ethics. Open to all SHS backgrounds — English language proficiency is the most important requirement. Ghana''s most established journalism degree offered at UniMAC.'),

('Public Relations',
 'BA', 4, 'Media & Communication', 'E,S,A',
 'General Arts, Business, General Science, Visual Arts, Home Economics, Technical',
 'English Language, Core Mathematics, Social Studies',
 'Any two elective subjects',
 'PR Officer, Corporate Communications Manager, Brand Strategist, Media Liaison, NGO Communications Officer',
 'Covers strategic communication, media relations, crisis communication, event management, and corporate branding. Highly versatile programme applicable across all industries.'),

('Film and Television Production',
 'BA', 4, 'Media & Communication', 'A,I,R',
 'General Arts, Visual Arts, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Literature in English, Visual Arts (or any two electives)',
 'Film Director, Cinematographer, Video Editor, TV Producer, Documentary Filmmaker, Content Creator',
 'Covers screenwriting, cinematography, directing, sound production, post-production, and documentary filmmaking. Offered through NAFTI (National Film and Television Institute), now part of UniMAC. Portfolio or aptitude test may be required.'),

('Communication Studies',
 'BA', 4, 'Media & Communication', 'A,S,E',
 'General Arts, Business, Visual Arts, Home Economics, Technical, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Any two elective subjects',
 'Media Practitioner, Communications Officer, Social Media Manager, Copywriter, Development Communicator',
 'Broad communication degree covering journalism, public relations, advertising, and development communication. Strong digital media component. All SHS backgrounds accepted.'),

('Integrated Marketing Communication',
 'BA', 4, 'Media & Communication', 'E,A,S',
 'Business, General Arts',
 'English Language, Core Mathematics, Social Studies',
 'Any two elective subjects',
 'Marketing Communications Manager, Advertising Executive, Digital Marketer, Brand Manager',
 'Combines marketing strategy with advertising, PR, and digital communications. Focuses on the integrated approach to brand messaging across all channels.'),

('Theatre Arts',
 'BA', 4, 'Arts & Social Sciences', 'A,S',
 'General Arts, Visual Arts',
 'English Language, Core Mathematics, Social Studies',
 'Literature in English, any two General Arts electives',
 'Theatre Director, Actor, Playwright, Drama Teacher, Arts Administrator, Cultural Officer',
 'Covers performance, playwriting, directing, stagecraft, and African dramatic traditions. Audition or portfolio typically required. Offered at University of Ghana and UCC.'),

('Ghanaian Languages',
 'BA', 4, 'Arts & Social Sciences', 'A,S,I',
 'General Arts',
 'English Language, Core Mathematics, Social Studies',
 'Ghanaian Language, Literature, any one General Arts elective',
 'Language Teacher, Translator, Interpreter, Cultural Officer, Linguistic Researcher',
 'Covers Akan, Ewe, Ga-Dangme, or other Ghanaian languages including phonology, grammar, literature, and sociolinguistics.'),

-- ── FASHION, TEXTILE & CREATIVE DESIGN ───────────────────────

('Fashion Design and Textiles',
 'BTech', 4, 'Creative & Applied Arts', 'A,R,E',
 'Visual Arts, Home Economics, Technical, General Arts, Business',
 'English Language, Core Mathematics, Social Studies (or Integrated Science)',
 'General Knowledge in Art, Textiles (or Clothing & Textiles); any one relevant elective',
 'Fashion Designer, Textile Designer, Pattern Maker, Costume Designer, Fashion Entrepreneur, Clothing Manufacturer',
 'Covers garment construction, pattern drafting, textile production, fashion illustration, and fashion business management. Offered at technical universities (KTU, ATU, TTU, HTU, CCTU). Portfolio or practical assessment usually required. Home Economics (Clothing & Textiles) background is ideal but not mandatory.'),

('Fashion Design',
 'BA', 4, 'Creative & Applied Arts', 'A,R,E',
 'Visual Arts, Home Economics, General Arts',
 'English Language, Core Mathematics, Social Studies',
 'General Knowledge in Art, Textiles or Clothing & Textiles, any one elective',
 'Fashion Designer, Stylist, Creative Director, Fashion Buyer, Brand Owner',
 'Four-year degree programme in fashion design covering haute couture, ready-to-wear, sustainable fashion, and creative entrepreneurship. Offered at Radford University College and Joyce Ababio College. Portfolio submission required.'),

('Graphic Design (Communication Design)',
 'BA', 4, 'Creative & Applied Arts', 'A,I,R',
 'Visual Arts, Technical',
 'English Language, Core Mathematics, Integrated Science (or Social Studies)',
 'General Knowledge in Art, Picture Making or Graphic Design, any one Visual Arts elective',
 'Graphic Designer, Brand Identity Designer, UI/UX Designer, Art Director, Motion Graphics Artist',
 'Covers typography, branding, illustration, digital design, and visual communication. Strong link to advertising and tech industries. Portfolio required.'),

('Painting and Sculpture',
 'BFA', 4, 'Creative & Applied Arts', 'A,R',
 'Visual Arts',
 'English Language, Core Mathematics, Integrated Science (or Social Studies)',
 'General Knowledge in Art, Picture Making, any one Visual Arts elective',
 'Visual Artist, Art Teacher, Gallery Curator, Art Therapist, Museum Officer',
 'Covers drawing, painting, sculpture, printmaking, and art history. Both traditional and contemporary African art approaches explored.'),

('Industrial Design',
 'BSc', 4, 'Creative & Applied Arts', 'A,R,I',
 'Visual Arts, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'General Knowledge in Art, Technical Drawing (or Metalwork/Woodwork), any one elective',
 'Industrial Designer, Product Designer, Furniture Designer, Packaging Designer',
 'Applies design principles to the creation of manufactured products, furniture, tools, and packaging. Bridges art and engineering.'),

('Ceramics Design and Technology',
 'BSc', 4, 'Creative & Applied Arts', 'A,R',
 'Visual Arts, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Ceramics, General Knowledge in Art, Chemistry (or Technical elective)',
 'Ceramicist, Potter, Art Teacher, Ceramic Product Manufacturer',
 'Covers ceramic making, pottery, glazing techniques, kiln operations, and product design for ceramic goods.'),

-- ── HOME ECONOMICS TRACK ──────────────────────────────────────

('Food and Nutrition Science',
 'BSc', 4, 'Home Economics & Applied Sciences', 'I,S,R',
 'Home Economics, General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Food & Nutrition (or Biology), Chemistry, any one elective',
 'Nutritionist, Dietitian, Food Safety Officer, Food Product Developer, Catering Manager',
 'Covers human nutrition, diet therapy, food biochemistry, food processing, and community nutrition. Ideal for Home Economics students specialising in Food & Nutrition. Also open to General Science students.'),

('Family and Consumer Sciences',
 'BSc', 4, 'Home Economics & Applied Sciences', 'S,I,R',
 'Home Economics',
 'English Language, Core Mathematics, Social Studies',
 'Food & Nutrition, Clothing & Textiles, Management in Living (any two)',
 'Consumer Affairs Officer, Home Economics Teacher, Community Development Officer, Social Worker',
 'Covers family resource management, child development, consumer education, and community living. Offered at University of Ghana, UCC, and UEW.'),

('Catering and Hospitality Management',
 'BTech', 4, 'Hospitality & Tourism', 'E,S,R',
 'Home Economics, Business, General Arts, Technical',
 'English Language, Core Mathematics, Social Studies',
 'Food & Nutrition (or any Business/Home Economics elective)',
 'Chef, Restaurant Manager, Hotel Operations Manager, Catering Manager, Food Entrepreneur',
 'Covers culinary arts, hotel management, food and beverage service, event catering, and tourism management. Very practical programme with industrial attachments.'),

('Hospitality and Tourism Management',
 'BSc', 4, 'Hospitality & Tourism', 'E,S,C',
 'Business, Home Economics, General Arts, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Economics, any two relevant electives',
 'Hotel Manager, Tour Operator, Travel Agent, Event Manager, Tourism Developer',
 'Covers tourism planning, hotel administration, travel operations, cultural tourism, and eco-tourism. Ghana''s growing tourism sector creates strong demand for graduates.'),

('Home Economics Education',
 'BEd', 4, 'Education', 'S,I,R',
 'Home Economics',
 'English Language, Core Mathematics, Social Studies',
 'Food & Nutrition, Clothing & Textiles, Management in Living (any two)',
 'Home Economics Teacher, Curriculum Developer, Educational Researcher, NGO Programme Officer',
 'Prepares Home Economics teachers for JHS and SHS level. Covers Food & Nutrition, Clothing & Textiles, Family Life, and pedagogy.'),

('Clothing and Textiles Education',
 'BEd', 4, 'Education', 'A,S,R',
 'Home Economics, Visual Arts',
 'English Language, Core Mathematics, Social Studies',
 'Clothing & Textiles, any two Home Economics or Visual Arts electives',
 'Clothing & Textiles Teacher, Fashion Instructor, Vocational Training Officer',
 'Specialist teacher education programme focusing on clothing construction, textiles, pattern making, and fashion pedagogy.'),

-- ── TECHNICAL / VOCATIONAL TRACK ─────────────────────────────

('Building and Construction Technology',
 'BTech', 4, 'Technical & Built Environment', 'R,I',
 'Technical, General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Building Construction, Technical Drawing, any one Technical or Science elective',
 'Building Technologist, Site Supervisor, Construction Manager, Building Inspector',
 'Covers building materials, construction methods, structural analysis, project supervision, and site management. Ideal entry point for Technical students into the construction industry.'),

('Electrical and Electronics Engineering Technology',
 'BTech', 4, 'Technical & Engineering', 'R,I',
 'Technical, General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Applied Electricity (or Basic Electronics), Elective Mathematics, Physics (or Technical Drawing)',
 'Electrical Technologist, Electronics Technician, Power Systems Technologist, Field Engineer',
 'Covers electrical installation, power systems, industrial electronics, and control systems. Ideal for Technical students with Applied Electricity background.'),

('Mechanical Engineering Technology',
 'BTech', 4, 'Technical & Engineering', 'R,I',
 'Technical, General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Auto Mechanics (or Metalwork), Technical Drawing, Elective Mathematics (or Physics)',
 'Mechanical Technologist, Maintenance Engineer, Auto Engineer, Manufacturing Supervisor',
 'Covers mechanical systems, manufacturing processes, automotive engineering, and maintenance management. Technical background with Auto Mechanics is ideal.'),

('Computer Hardware and Networking Technology',
 'BTech', 4, 'Computing & IT', 'R,I,C',
 'Technical, General Science',
 'English Language, Core Mathematics, Integrated Science',
 'ICT, Elective Mathematics, Applied Electricity (or Physics)',
 'Network Engineer, IT Support Technician, Systems Administrator, Hardware Engineer',
 'Practical computing degree covering computer hardware, network installation, systems administration, and cybersecurity fundamentals. Well-suited for Technical students with ICT background.'),

('Automobile Engineering Technology',
 'BTech', 4, 'Technical & Engineering', 'R,I',
 'Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Auto Mechanics, Technical Drawing, Elective Mathematics (or Physics)',
 'Automobile Engineer, Fleet Manager, Vehicle Diagnostics Technician, Automotive Lecturer',
 'Covers vehicle diagnostics, engine overhaul, auto-electrical systems, and fleet management. One of the most industry-ready Technical track programmes in Ghana.'),

('Nautical Science and Maritime Studies',
 'BSc', 4, 'Technical & Engineering', 'R,I',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Elective Mathematics, Chemistry (or Technical elective)',
 'Deck Officer, Harbour Master, Maritime Inspector, Shipping Manager, Port Logistics Officer',
 'Covers ship navigation, maritime law, cargo management, and port operations. Offered at TTU (Takoradi) near Ghana''s main port. Strong career prospects in Ghana''s growing oil and shipping sector.'),

('Oil and Gas Engineering Technology',
 'BTech', 4, 'Technical & Engineering', 'R,I',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Chemistry, Elective Mathematics',
 'Oil & Gas Technologist, Pipeline Engineer, Rig Operator, HSE Officer',
 'Focused on Ghana''s upstream and downstream oil and gas industry. Covers drilling operations, refinery processes, HSE management, and pipeline systems. Unique to Takoradi Technical University.'),

-- ── BUSINESS TRACK (EXPANDED) ────────────────────────────────

('Secretaryship and Management Studies',
 'HND', 3, 'Business', 'C,E,S',
 'Business, General Arts',
 'English Language, Core Mathematics, Social Studies',
 'Any three Business or General Arts electives',
 'Executive Secretary, Office Manager, Personal Assistant, Administrative Officer, Records Manager',
 'Three-year HND covering office management, records administration, business communication, and secretarial procedures. Widely offered at technical universities and highly employable.'),

('Banking and Finance',
 'BSc', 4, 'Business', 'C,E',
 'Business, General Arts, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Economics, Elective Mathematics, Accounting (or Financial Accounting)',
 'Banker, Financial Analyst, Investment Advisor, Credit Officer, Treasury Manager',
 'Covers banking operations, financial markets, credit management, and investment banking. Elective Mathematics is a key requirement for most institutions.'),

('Procurement and Supply Chain Management',
 'BSc', 4, 'Business', 'C,E',
 'Business, General Arts',
 'English Language, Core Mathematics, Social Studies',
 'Economics, any two Business electives',
 'Procurement Officer, Supply Chain Manager, Logistics Analyst, Inventory Controller',
 'Covers purchasing, tendering, contract management, supply chain optimisation, and procurement law. High demand in government institutions and multinational companies in Ghana.'),

('Insurance and Risk Management',
 'BSc', 4, 'Business', 'C,E',
 'Business, General Arts',
 'English Language, Core Mathematics, Social Studies',
 'Economics, Elective Mathematics, Accounting (or any Business elective)',
 'Insurance Officer, Actuary, Risk Analyst, Claims Manager, Underwriter',
 'Covers insurance principles, actuarial science basics, risk assessment, and financial regulation. Growing industry in Ghana with strong demand for qualified professionals.'),

('Real Estate Management',
 'BSc', 4, 'Business', 'E,C,I',
 'Business, General Arts, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Economics, Elective Mathematics, Geography (or any elective)',
 'Real Estate Developer, Property Manager, Estate Valuer, Land Administrator, Mortgage Advisor',
 'Covers property law, valuation, real estate development, land economics, and property management.'),

-- ── EDUCATION (EXPANDED) ─────────────────────────────────────

('Technical and Vocational Education',
 'BEd', 4, 'Education', 'R,S,I',
 'Technical, Visual Arts, Home Economics',
 'English Language, Core Mathematics, Integrated Science',
 'Any three Technical, Visual Arts, or Home Economics electives',
 'Technical Teacher, TVET Instructor, Vocational Training Officer, Skills Trainer',
 'Prepares teachers for technical and vocational institutions. Covers pedagogy for practical and trade subjects including woodwork, metalwork, auto mechanics, and electronics.'),

('Physical Education and Sport',
 'BEd', 4, 'Education', 'R,S',
 'General Arts, General Science, Home Economics',
 'English Language, Core Mathematics, Social Studies (or Integrated Science)',
 'Any three elective subjects',
 'PE Teacher, Sports Coach, Physical Fitness Trainer, Sports Administrator',
 'Covers exercise physiology, sports psychology, coaching methodology, health education, and recreational management.'),

('Music Education',
 'BEd', 4, 'Education', 'A,S',
 'General Arts, Visual Arts',
 'English Language, Core Mathematics, Social Studies',
 'Music, any two General Arts electives',
 'Music Teacher, Musician, Choir Director, Music Producer, Cultural Performer',
 'Covers music theory, performance, composition, and music pedagogy. Audition required at most institutions.'),

('Religious and Moral Education',
 'BEd', 4, 'Education', 'S,I',
 'General Arts',
 'English Language, Core Mathematics, Social Studies',
 'Religious Studies, any two General Arts electives',
 'RME Teacher, Religious Leader, Counsellor, Community Development Worker',
 'Covers comparative religion, ethics, moral philosophy, and pedagogical approaches to teaching RME.'),

-- ── AGRICULTURE (EXPANDED) ───────────────────────────────────

('Veterinary Nursing',
 'BSc', 4, 'Agriculture', 'I,S,R',
 'General Science, Agriculture',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, General Agriculture (or Physics)',
 'Veterinary Nurse, Animal Health Technician, Zoo Keeper, Livestock Officer',
 'Covers animal anatomy, clinical nursing techniques, animal disease management, and laboratory procedures for veterinary practice.'),

('Aquaculture and Water Resources Management',
 'BSc', 4, 'Agriculture', 'R,I',
 'General Science, Agriculture',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, General Agriculture (or Physics)',
 'Aquaculture Manager, Fish Farmer, Water Resources Officer, Marine Biologist',
 'Covers fish farming, water quality management, aquatic biology, and sustainable fisheries. Especially relevant given Ghana''s coastal and inland water resources.'),

-- ── HEALTH (EXPANDED) ────────────────────────────────────────

('Nursing Certificate (Nursing Training College)',
 'Certificate', 3, 'Health Sciences', 'S,I',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Physics (or Elective Mathematics)',
 'Enrolled Nurse, Community Health Officer, Healthcare Worker, Clinic Nurse',
 'Three-year certificate nursing programme offered at government Nursing Training Colleges across Ghana under the Ministry of Health. Lower aggregate requirements than degree nursing. Available in most regional capitals. Very high employment rate — direct government posting after completion.'),

('Pharmacy Technician Studies',
 'HND', 3, 'Health Sciences', 'I,C,S',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Chemistry, Biology, Physics (or Elective Mathematics)',
 'Pharmacy Technician, Drug Store Manager, Medical Sales Representative, Pharmaceutical Assistant',
 'Three-year HND covering pharmacology basics, drug dispensing, pharmaceutical calculations, and pharmacy management. Offered at various technical universities and health training institutions.'),

('Occupational Therapy',
 'BSc', 4, 'Health Sciences', 'S,I,R',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Physics',
 'Occupational Therapist, Rehabilitation Specialist, Disability Services Officer',
 'Covers therapeutic interventions to help individuals with physical, mental, or developmental conditions participate in daily activities. Emerging profession in Ghana.'),

('Prosthetics and Orthotics',
 'BSc', 4, 'Health Sciences', 'R,I,S',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Physics, Chemistry (or Technical elective)',
 'Prosthetist, Orthotist, Rehabilitation Technologist, Medical Device Specialist',
 'Covers the design, fabrication, and fitting of prosthetic limbs and orthotic devices for people with physical disabilities.'),

-- ── LANGUAGES ────────────────────────────────────────────────

('French Studies',
 'BA', 4, 'Arts & Social Sciences', 'A,S,I',
 'General Arts',
 'English Language, Core Mathematics, Social Studies',
 'French, Literature in English, any one General Arts elective',
 'Translator, Interpreter, Diplomat, French Teacher, International Organisation Officer',
 'Covers French language, literature, culture, and professional translation. ECOWAS and African Union careers favour French-English bilingualism strongly.'),

('Modern Languages',
 'BA', 4, 'Arts & Social Sciences', 'A,S,I',
 'General Arts',
 'English Language, Core Mathematics, Social Studies',
 'French (or any language), any two General Arts electives',
 'Translator, Interpreter, Diplomat, Language Teacher, Tour Guide',
 'Multi-language programme covering French, Arabic, Chinese, or other languages offered at Ghana Institute of Languages (UniMAC-GIL). Highly relevant for international careers.');


-- ============================================================
--  STEP 4: ADD UNIVERSITY-PROGRAMME LINKS FOR NEW INSTITUTIONS
-- ============================================================

-- ── UniMAC (GIJ / NAFTI / GIL) ───────────────────────────────
-- Source: UniMAC/GIJ official — WASSCE aggregate ≤ 30;
-- credit passes in English, Mathematics + 2 electives required
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

((SELECT id FROM universities WHERE code='UNIMAC'),
 (SELECT id FROM programmes WHERE name='Journalism'),
 30, 20, 'Ringway/Osu Campus, Accra',
 'Ghana''s premier journalism school. Credit passes in English and Maths required. All SHS backgrounds accepted. Entrance exam waived if aggregate ≤ 30.'),

((SELECT id FROM universities WHERE code='UNIMAC'),
 (SELECT id FROM programmes WHERE name='Public Relations'),
 30, 20, 'Ringway/Osu Campus, Accra',
 'BA Public Relations. All SHS backgrounds accepted. English Language credit required.'),

((SELECT id FROM universities WHERE code='UNIMAC'),
 (SELECT id FROM programmes WHERE name='Film and Television Production'),
 30, 20, 'North Dzorwulu Campus (NAFTI), Accra',
 'Offered through NAFTI (National Film and Television Institute). Aptitude test and portfolio may be required. All SHS backgrounds accepted.'),

((SELECT id FROM universities WHERE code='UNIMAC'),
 (SELECT id FROM programmes WHERE name='Communication Studies'),
 30, 20, 'Ringway/Osu Campus, Accra',
 NULL),

((SELECT id FROM universities WHERE code='UNIMAC'),
 (SELECT id FROM programmes WHERE name='Integrated Marketing Communication'),
 30, 20, 'Ringway/Osu Campus, Accra',
 NULL),

((SELECT id FROM universities WHERE code='UNIMAC'),
 (SELECT id FROM programmes WHERE name='Modern Languages'),
 30, 20, 'GIL Campus, Accra',
 'Offered through Ghana Institute of Languages (GIL). Languages include French, Spanish, Arabic, Chinese, Russian, and Hausa.');


-- ── Kumasi Technical University (KTU) ────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

((SELECT id FROM universities WHERE code='KTU'),
 (SELECT id FROM programmes WHERE name='Fashion Design and Textiles'),
 36, 24, 'Kumasi Main Campus',
 'BTech Fashion Design and Textiles. Home Economics (Clothing & Textiles) or Visual Arts background strongly preferred. Portfolio or practical assessment required.'),

((SELECT id FROM universities WHERE code='KTU'),
 (SELECT id FROM programmes WHERE name='Catering and Hospitality Management'),
 36, 24, 'Kumasi Main Campus',
 'BTech. Home Economics (Food & Nutrition) background ideal.'),

((SELECT id FROM universities WHERE code='KTU'),
 (SELECT id FROM programmes WHERE name='Electrical and Electronics Engineering Technology'),
 36, 24, 'Kumasi Main Campus',
 'BTech. Applied Electricity or Basic Electronics background preferred.'),

((SELECT id FROM universities WHERE code='KTU'),
 (SELECT id FROM programmes WHERE name='Mechanical Engineering Technology'),
 36, 24, 'Kumasi Main Campus',
 'BTech. Auto Mechanics or Metalwork background preferred.'),

((SELECT id FROM universities WHERE code='KTU'),
 (SELECT id FROM programmes WHERE name='Building and Construction Technology'),
 36, 24, 'Kumasi Main Campus',
 'BTech. Building Construction or Technical Drawing background ideal.'),

((SELECT id FROM universities WHERE code='KTU'),
 (SELECT id FROM programmes WHERE name='Computer Hardware and Networking Technology'),
 36, 24, 'Kumasi Main Campus',
 NULL),

((SELECT id FROM universities WHERE code='KTU'),
 (SELECT id FROM programmes WHERE name='Automobile Engineering Technology'),
 36, 24, 'Kumasi Main Campus',
 'BTech. Auto Mechanics background ideal.'),

((SELECT id FROM universities WHERE code='KTU'),
 (SELECT id FROM programmes WHERE name='Food and Nutrition Science'),
 36, 24, 'Kumasi Main Campus',
 'Home Economics (Food & Nutrition) background preferred.'),

((SELECT id FROM universities WHERE code='KTU'),
 (SELECT id FROM programmes WHERE name='Accounting'),
 36, 24, 'Kumasi Main Campus',
 'Business or General Arts background.'),

((SELECT id FROM universities WHERE code='KTU'),
 (SELECT id FROM programmes WHERE name='Secretaryship and Management Studies'),
 36, 24, 'Kumasi Main Campus',
 'HND programme. Business background preferred.');


-- ── Accra Technical University (ATU) ─────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

((SELECT id FROM universities WHERE code='ATU'),
 (SELECT id FROM programmes WHERE name='Fashion Design and Textiles'),
 36, 24, 'Accra Main Campus',
 'Oldest fashion programme in Accra; established 1949. Portfolio required.'),

((SELECT id FROM universities WHERE code='ATU'),
 (SELECT id FROM programmes WHERE name='Graphic Design (Communication Design)'),
 36, 24, 'Accra Main Campus',
 'Visual Arts or Technical background preferred. Portfolio required.'),

((SELECT id FROM universities WHERE code='ATU'),
 (SELECT id FROM programmes WHERE name='Catering and Hospitality Management'),
 36, 24, 'Accra Main Campus',
 NULL),

((SELECT id FROM universities WHERE code='ATU'),
 (SELECT id FROM programmes WHERE name='Electrical and Electronics Engineering Technology'),
 36, 24, 'Accra Main Campus',
 NULL),

((SELECT id FROM universities WHERE code='ATU'),
 (SELECT id FROM programmes WHERE name='Building and Construction Technology'),
 36, 24, 'Accra Main Campus',
 NULL),

((SELECT id FROM universities WHERE code='ATU'),
 (SELECT id FROM programmes WHERE name='Computer Hardware and Networking Technology'),
 36, 24, 'Accra Main Campus',
 NULL),

((SELECT id FROM universities WHERE code='ATU'),
 (SELECT id FROM programmes WHERE name='Accounting'),
 36, 24, 'Accra Main Campus',
 NULL),

((SELECT id FROM universities WHERE code='ATU'),
 (SELECT id FROM programmes WHERE name='Secretaryship and Management Studies'),
 36, 24, 'Accra Main Campus',
 NULL);


-- ── Takoradi Technical University (TTU) ──────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

((SELECT id FROM universities WHERE code='TTU'),
 (SELECT id FROM programmes WHERE name='Oil and Gas Engineering Technology'),
 36, 24, 'Takoradi Main Campus',
 'Unique programme in Ghana; proximity to Western Region oilfields. Science or Technical background required.'),

((SELECT id FROM universities WHERE code='TTU'),
 (SELECT id FROM programmes WHERE name='Nautical Science and Maritime Studies'),
 36, 24, 'Takoradi Main Campus',
 'Near Takoradi Port. Physical fitness test and eyesight check required.'),

((SELECT id FROM universities WHERE code='TTU'),
 (SELECT id FROM programmes WHERE name='Mechanical Engineering Technology'),
 36, 24, 'Takoradi Main Campus',
 NULL),

((SELECT id FROM universities WHERE code='TTU'),
 (SELECT id FROM programmes WHERE name='Electrical and Electronics Engineering Technology'),
 36, 24, 'Takoradi Main Campus',
 NULL),

((SELECT id FROM universities WHERE code='TTU'),
 (SELECT id FROM programmes WHERE name='Building and Construction Technology'),
 36, 24, 'Takoradi Main Campus',
 NULL),

((SELECT id FROM universities WHERE code='TTU'),
 (SELECT id FROM programmes WHERE name='Fashion Design and Textiles'),
 36, 24, 'Takoradi Main Campus',
 NULL),

((SELECT id FROM universities WHERE code='TTU'),
 (SELECT id FROM programmes WHERE name='Catering and Hospitality Management'),
 36, 24, 'Takoradi Main Campus',
 NULL),

((SELECT id FROM universities WHERE code='TTU'),
 (SELECT id FROM programmes WHERE name='Accounting'),
 36, 24, 'Takoradi Main Campus',
 NULL);


-- ── Ho Technical University (HTU) ────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

((SELECT id FROM universities WHERE code='HTU'),
 (SELECT id FROM programmes WHERE name='Fashion Design and Textiles'),
 36, 24, 'Ho Main Campus', NULL),

((SELECT id FROM universities WHERE code='HTU'),
 (SELECT id FROM programmes WHERE name='Catering and Hospitality Management'),
 36, 24, 'Ho Main Campus', NULL),

((SELECT id FROM universities WHERE code='HTU'),
 (SELECT id FROM programmes WHERE name='Electrical and Electronics Engineering Technology'),
 36, 24, 'Ho Main Campus', NULL),

((SELECT id FROM universities WHERE code='HTU'),
 (SELECT id FROM programmes WHERE name='Building and Construction Technology'),
 36, 24, 'Ho Main Campus', NULL),

((SELECT id FROM universities WHERE code='HTU'),
 (SELECT id FROM programmes WHERE name='Accounting'),
 36, 24, 'Ho Main Campus', NULL),

((SELECT id FROM universities WHERE code='HTU'),
 (SELECT id FROM programmes WHERE name='Computer Hardware and Networking Technology'),
 36, 24, 'Ho Main Campus', NULL);


-- ── Cape Coast Technical University (CCTU) ───────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

((SELECT id FROM universities WHERE code='CCTU'),
 (SELECT id FROM programmes WHERE name='Fashion Design and Textiles'),
 36, 24, 'Cape Coast Main Campus', NULL),

((SELECT id FROM universities WHERE code='CCTU'),
 (SELECT id FROM programmes WHERE name='Catering and Hospitality Management'),
 36, 24, 'Cape Coast Main Campus', NULL),

((SELECT id FROM universities WHERE code='CCTU'),
 (SELECT id FROM programmes WHERE name='Electrical and Electronics Engineering Technology'),
 36, 24, 'Cape Coast Main Campus', NULL),

((SELECT id FROM universities WHERE code='CCTU'),
 (SELECT id FROM programmes WHERE name='Building and Construction Technology'),
 36, 24, 'Cape Coast Main Campus', NULL),

((SELECT id FROM universities WHERE code='CCTU'),
 (SELECT id FROM programmes WHERE name='Accounting'),
 36, 24, 'Cape Coast Main Campus', NULL);


-- ── Joyce Ababio College of Creative Design ───────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

((SELECT id FROM universities WHERE code='JAACD'),
 (SELECT id FROM programmes WHERE name='Fashion Design'),
 36, 24, 'East Legon, Accra',
 'Ghana''s most prestigious private fashion school. Portfolio, interview, and aptitude test required. All SHS backgrounds accepted. Small class sizes — early application advised.'),

((SELECT id FROM universities WHERE code='JAACD'),
 (SELECT id FROM programmes WHERE name='Fashion Design and Textiles'),
 36, 24, 'East Legon, Accra',
 'Diploma pathway also available for those who do not meet degree requirements.');


-- ── Radford University College ────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

((SELECT id FROM universities WHERE code='RADFORD'),
 (SELECT id FROM programmes WHERE name='Fashion Design'),
 24, 16, 'Accra Main Campus',
 'BA Fashion Design. SSSCE aggregate ≤ 24 / WASSCE aggregate ≤ 24. Portfolio required. All backgrounds accepted.'),

((SELECT id FROM universities WHERE code='RADFORD'),
 (SELECT id FROM programmes WHERE name='Graphic Design (Communication Design)'),
 24, 16, 'Accra Main Campus',
 'Portfolio required. Visual Arts or Technical background preferred.');


-- ── Nursing Training Colleges ─────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

((SELECT id FROM universities WHERE code='ANTTC'),
 (SELECT id FROM programmes WHERE name='Nursing Certificate (Nursing Training College)'),
 30, 20, 'Multiple campuses (regional capitals)',
 'Government Nursing Training Colleges exist in most regions: Accra, Kumasi, Tamale, Cape Coast, Koforidua, Sunyani, Ho, Bolgatanga, Wa, Sekondi-Takoradi. Lower entry requirements than degree nursing. Science background required. Biology and Chemistry mandatory. Government-sponsored bursary available.');


-- ── UG, UCC, UEW — Additional programmes from new list ───────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

-- UG
((SELECT id FROM universities WHERE code='UG' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Theatre Arts'),
 24, 16, 'Legon Campus', 'Audition required. Open to General Arts and Visual Arts students.'),

((SELECT id FROM universities WHERE code='UG' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Family and Consumer Sciences'),
 24, 16, 'Legon Campus', 'Home Economics background preferred; General Science also accepted.'),

((SELECT id FROM universities WHERE code='UG' LIMIT 1),
 (SELECT id FROM programmes WHERE name='French Studies'),
 24, 16, 'Legon Campus', NULL),

((SELECT id FROM universities WHERE code='UG' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Ghanaian Languages'),
 24, 16, 'Legon Campus', NULL),

-- UCC
((SELECT id FROM universities WHERE code='UCC' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Theatre Arts'),
 24, 16, 'Cape Coast Main Campus', 'Audition required.'),

((SELECT id FROM universities WHERE code='UCC' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Home Economics Education'),
 24, 16, 'Cape Coast Main Campus', 'Home Economics background required.'),

((SELECT id FROM universities WHERE code='UCC' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Clothing and Textiles Education'),
 24, 16, 'Cape Coast Main Campus', NULL),

((SELECT id FROM universities WHERE code='UCC' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Music Education'),
 24, 16, 'Cape Coast Main Campus', 'Audition required.'),

((SELECT id FROM universities WHERE code='UCC' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Physical Education and Sport'),
 24, 16, 'Cape Coast Main Campus', 'Physical fitness test required.'),

((SELECT id FROM universities WHERE code='UCC' LIMIT 1),
 (SELECT id FROM programmes WHERE name='French Studies'),
 24, 16, 'Cape Coast Main Campus', NULL),

((SELECT id FROM universities WHERE code='UCC' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Religious and Moral Education'),
 24, 16, 'Cape Coast Main Campus', NULL),

((SELECT id FROM universities WHERE code='UCC' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Hospitality and Tourism Management'),
 24, 16, 'Cape Coast Main Campus', NULL),

-- UEW
((SELECT id FROM universities WHERE code='UEW' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Home Economics Education'),
 24, 16, 'Winneba Campus', 'Home Economics background required.'),

((SELECT id FROM universities WHERE code='UEW' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Clothing and Textiles Education'),
 24, 16, 'Winneba Campus', NULL),

((SELECT id FROM universities WHERE code='UEW' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Physical Education and Sport'),
 24, 16, 'Kumasi Campus', NULL),

((SELECT id FROM universities WHERE code='UEW' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Music Education'),
 24, 16, 'Winneba Campus', 'Audition required.'),

((SELECT id FROM universities WHERE code='UEW' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Technical and Vocational Education'),
 24, 16, 'Kumasi Campus', 'Technical, Visual Arts, or Home Economics background required.'),

((SELECT id FROM universities WHERE code='UEW' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Religious and Moral Education'),
 24, 16, 'Winneba Campus', NULL),

-- KNUST additional
((SELECT id FROM universities WHERE code='KNUST' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Graphic Design (Communication Design)'),
 13, 9, 'Main Campus', 'BA Communication Design. Visual Arts background required. Portfolio mandatory.'),

((SELECT id FROM universities WHERE code='KNUST' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Painting and Sculpture'),
 15, 10, 'Main Campus', 'BFA. Visual Arts background required. Portfolio and interview required.'),

((SELECT id FROM universities WHERE code='KNUST' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Ceramics Design and Technology'),
 24, 16, 'Main Campus', 'Visual Arts or Technical background. Practical exam required.'),

((SELECT id FROM universities WHERE code='KNUST' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Fashion Design and Textiles'),
 13, 9, 'Main Campus', 'BSc Textile Design and Technology. Home Economics or Visual Arts background preferred. Portfolio required.'),

((SELECT id FROM universities WHERE code='KNUST' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Theatre Arts'),
 NULL, NULL, 'Main Campus', 'Part of the BA Humanities cluster. Audition may be required.'),

((SELECT id FROM universities WHERE code='KNUST' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Communication Studies'),
 13, 9, 'Main Campus', 'BA Communication Studies. All SHS backgrounds accepted.'),

((SELECT id FROM universities WHERE code='KNUST' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Food and Nutrition Science'),
 14, 10, 'Main Campus', 'Home Economics (Food & Nutrition) or General Science background.'),

((SELECT id FROM universities WHERE code='KNUST' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Aquaculture and Water Resources Management'),
 22, 15, 'Main Campus', NULL),

((SELECT id FROM universities WHERE code='KNUST' LIMIT 1),
 (SELECT id FROM programmes WHERE name='Hospitality and Tourism Management'),
 24, 16, 'Main Campus', NULL);


-- ============================================================
--  STEP 5: SHS TRACK REFERENCE TABLE
--  Maps SHS tracks to their elective subjects
-- ============================================================

CREATE TABLE IF NOT EXISTS shs_tracks (
    id              SERIAL PRIMARY KEY,
    track_name      VARCHAR(60) UNIQUE NOT NULL,
    typical_electives TEXT NOT NULL,
    description     TEXT,
    note            TEXT
);

INSERT INTO shs_tracks (track_name, typical_electives, description, note) VALUES

('General Science',
 'Physics, Chemistry, Biology, Elective Mathematics',
 'The broadest science track. Students study Physics, Chemistry, Biology, and Elective Mathematics. Provides access to the widest range of university programmes including Medicine, Engineering, Computer Science, Pharmacy, and Nursing.',
 'Most competitive track for prestigious programmes. All four subjects are useful for different programmes.'),

('Technical',
 'Applied Electricity / Basic Electronics, Technical Drawing, Woodwork / Metalwork / Auto Mechanics / Building Construction, Elective Mathematics',
 'Focuses on practical engineering and technical skills. Prepares students for BTech and HND programmes in technical universities and also degree programmes at KNUST and other universities.',
 'Students can access Engineering Technology, Computing, Construction, and Automobile programmes. Elective Maths strengthens access to degree-level engineering.'),

('Visual Arts',
 'General Knowledge in Art, Picture Making / Graphic Design, Textiles / Sculpture / Ceramics / Leatherwork',
 'Creative arts track covering fine arts, graphic design, fashion, and applied arts. Students are well-positioned for fashion design, graphic design, architecture, and communication design programmes.',
 'Portfolio submission is typically required for admission to arts programmes. Strong link to KNUST''s College of Art and Built Environment.'),

('Home Economics',
 'Food and Nutrition, Clothing and Textiles, Management in Living',
 'Covers domestic and applied sciences including nutrition, garment construction, family resource management, and child development. Opens doors to Fashion, Nutrition Science, Family Studies, Education, and Nursing.',
 'Home Economics students can access a wide range of programmes. Many underestimate this track — it provides entry to health, education, business, and creative arts programmes.'),

('General Arts',
 'Economics, Government, History, Geography, Literature in English, French, Ghanaian Languages, Religious Studies, Elective Mathematics',
 'The most flexible arts track. Students can combine any arts electives. Provides access to Law, Business, Social Sciences, Journalism, Languages, Education, and many other programmes.',
 'Elective Maths in this track opens additional doors to Business and Economics programmes requiring quantitative analysis.'),

('Business',
 'Financial Accounting, Cost Accounting, Business Management, Economics, Elective Mathematics',
 'Focuses on business, accounting, and economics. Directly feeds into Business Administration, Accounting, Banking, Marketing, and Economics programmes at university.',
 'Business track students should note that some science and engineering programmes require Integrated Science credits even for non-science electives.'),

('Agriculture Science',
 'General Agriculture, Animal Husbandry, Biology, Chemistry',
 'Practical agriculture track covering crop production, animal science, and agribusiness. Provides direct access to Agricultural Engineering, Agribusiness, Food Science, and Natural Resources programmes.',
 'Agriculture students are often overlooked but can access a strong range of science-adjacent and farming-related programmes at KNUST, UG, UDS, and UENR.');


-- ============================================================
--  STEP 6: UPDATE RIASEC QUESTIONS — ADD TRACK-SPECIFIC ONES
-- ============================================================

INSERT INTO riasec_questions (question, riasec_type) VALUES
('I enjoy sketching, drawing, or designing clothes and accessories.', 'A'),
('I am interested in sewing, pattern making, or textile production.', 'A'),
('I enjoy cooking, experimenting with recipes, or learning about nutrition.', 'R'),
('I like working with electrical circuits, machines, or electronic devices.', 'R'),
('I am interested in reporting news, writing stories, or making films.', 'A'),
('I enjoy presenting ideas or performing in front of an audience.', 'A'),
('I like building or constructing things — furniture, walls, or structures.', 'R'),
('I am interested in farming, food production, or natural resource management.', 'R'),
('I enjoy managing events, leading groups, or running a business.', 'E'),
('I am interested in helping communities or working in public service.', 'S');


-- ============================================================
--  STEP 7: USEFUL VIEW — PROGRAMMES BY SHS TRACK
-- ============================================================

CREATE OR REPLACE VIEW v_programmes_by_shs_track AS
SELECT
    p.name                  AS programme,
    p.degree_type,
    p.field_category,
    p.riasec_tags,
    p.shs_background,
    p.duration_years,
    p.career_outcomes,
    COUNT(up.id)            AS universities_offering,
    MIN(up.wassce_cutoff)   AS best_wassce_cutoff
FROM programmes p
LEFT JOIN university_programmes up ON up.programme_id = p.id
GROUP BY p.id, p.name, p.degree_type, p.field_category, p.riasec_tags, p.shs_background, p.duration_years, p.career_outcomes
ORDER BY p.field_category, p.name;


-- ============================================================
--  STEP 8: SAMPLE BACKEND QUERIES FOR NEW TRACKS
-- ============================================================

-- Find all programmes open to Technical students:
-- SELECT programme, degree_type, field_category, universities_offering, best_wassce_cutoff
-- FROM v_programmes_by_shs_track
-- WHERE shs_background ILIKE '%Technical%';

-- Find all programmes open to Home Economics students:
-- SELECT programme, degree_type, field_category, universities_offering, best_wassce_cutoff
-- FROM v_programmes_by_shs_track
-- WHERE shs_background ILIKE '%Home Economics%';

-- Find all programmes open to Visual Arts students:
-- SELECT programme, degree_type, field_category, universities_offering, best_wassce_cutoff
-- FROM v_programmes_by_shs_track
-- WHERE shs_background ILIKE '%Visual Arts%';

-- Find journalism and media programmes:
-- SELECT p.name, u.short_name, up.wassce_cutoff, u.location_city
-- FROM university_programmes up
-- JOIN programmes p ON p.id = up.programme_id
-- JOIN universities u ON u.id = up.university_id
-- WHERE p.field_category = 'Media & Communication';

-- ============================================================
--  END OF EXTENSION FILE
-- ============================================================
