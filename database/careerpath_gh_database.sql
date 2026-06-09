-- ============================================================
--  CareerPath GH — Full Database Seed (PostgreSQL)
--  Phase 3: University & Programme Data Collection
--  Source: Official university admissions portals & verified
--          published cut-off aggregates (2024/2025 academic year)
--
--  WASSCE Aggregate Note:
--  Lower aggregate = better performance.
--  A1=1, B2=2, B3=3, C4/C5/C6=4. D7/E8/F9 not accepted.
--  Aggregate is calculated from best 6 subjects (3 core + 3 elective).
-- ============================================================


-- ============================================================
--  TABLE: universities
-- ============================================================
CREATE TABLE IF NOT EXISTS universities (
    id              SERIAL PRIMARY KEY,
    code            VARCHAR(20)  UNIQUE NOT NULL,
    name            VARCHAR(150) NOT NULL,
    short_name      VARCHAR(30)  NOT NULL,
    type            VARCHAR(20)  NOT NULL CHECK (type IN ('public','private','technical')),
    location_city   VARCHAR(60)  NOT NULL,
    region          VARCHAR(60)  NOT NULL,
    website         VARCHAR(150),
    phone           VARCHAR(40),
    established     INT,
    description     TEXT
);

INSERT INTO universities (code, name, short_name, type, location_city, region, website, phone, established, description) VALUES

('KNUST',
 'Kwame Nkrumah University of Science and Technology',
 'KNUST', 'public', 'Kumasi', 'Ashanti Region',
 'https://www.knust.edu.gh', '+233-32-206-0352', 1952,
 'Premier science and technology university in Ghana and one of the leading universities in West Africa. Located in Kumasi with over 63,000 students across multiple colleges.'),

('UG',
 'University of Ghana',
 'UG / Legon', 'public', 'Accra', 'Greater Accra Region',
 'https://www.ug.edu.gh', '+233-30-250-0381', 1948,
 'Oldest and largest university in Ghana, located in Legon, Accra. Offers programmes across arts, sciences, law, medicine, and social sciences.'),

('UCC',
 'University of Cape Coast',
 'UCC', 'public', 'Cape Coast', 'Central Region',
 'https://www.ucc.edu.gh', '+233-33-209-2931', 1962,
 'Major public university in Cape Coast with strong strengths in education, sciences, social sciences, and health. Known for teacher training and distance education.'),

('UDS',
 'University for Development Studies',
 'UDS', 'public', 'Tamale', 'Northern Region',
 'https://www.uds.edu.gh', '+233-37-209-3697', 1992,
 'Established to serve the development needs of northern Ghana. Campuses in Tamale, Wa, Bolgatanga, Navrongo, and Nyankpala.'),

('UEW',
 'University of Education, Winneba',
 'UEW', 'public', 'Winneba', 'Central Region',
 'https://www.uew.edu.gh', '+233-32-209-3535', 1992,
 'Dedicated teacher education university with multiple campuses across Ghana. Strong in education programmes across all subjects.'),

('UMAT',
 'University of Mines and Technology',
 'UMaT', 'public', 'Tarkwa', 'Western Region',
 'https://www.umat.edu.gh', '+233-31-209-3669', 2004,
 'Specialist university focusing on mining, engineering, and technology. Located in Tarkwa, the heart of Ghana''s gold mining belt.'),

('UENR',
 'University of Energy and Natural Resources',
 'UENR', 'public', 'Sunyani', 'Bono Region',
 'https://www.uenr.edu.gh', '+233-35-202-7166', 2011,
 'Specialist university focusing on energy systems, renewable energy, natural resources, and environmental sciences.'),

('UPSA',
 'University of Professional Studies, Accra',
 'UPSA', 'public', 'Accra', 'Greater Accra Region',
 'https://www.upsa.edu.gh', '+233-30-295-7091', 1965,
 'Business-focused public university offering professionally accredited programmes in accounting, marketing, law, and management.'),

('GIMPA',
 'Ghana Institute of Management and Public Administration',
 'GIMPA', 'public', 'Accra', 'Greater Accra Region',
 'https://www.gimpa.edu.gh', '+233-30-240-1681', 1961,
 'Leading management and public administration university. Located in Achimota, Accra. Strong in law, business, and governance programmes.'),

('GCTU',
 'Ghana Communication Technology University',
 'GCTU', 'public', 'Accra', 'Greater Accra Region',
 'https://www.gctu.edu.gh', '+233-30-296-5661', 2016,
 'Technology-focused university specializing in ICT, communications, cybersecurity, and engineering programmes.'),

('UHAS',
 'University of Health and Allied Sciences',
 'UHAS', 'public', 'Ho', 'Volta Region',
 'https://www.uhas.edu.gh', '+233-36-209-2440', 2012,
 'Specialist health university in Ho, Volta Region. Focuses exclusively on health, pharmacy, nursing, and allied health sciences.');


-- ============================================================
--  TABLE: faculties / colleges
-- ============================================================
CREATE TABLE IF NOT EXISTS faculties (
    id              SERIAL PRIMARY KEY,
    university_id   INT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    name            VARCHAR(150) NOT NULL,
    code            VARCHAR(30)
);

INSERT INTO faculties (university_id, name, code) VALUES
-- KNUST
(1, 'College of Engineering',                           'KNUST-ENG'),
(1, 'College of Science',                               'KNUST-SCI'),
(1, 'College of Health Sciences',                       'KNUST-HLTH'),
(1, 'College of Art and Built Environment',             'KNUST-ART'),
(1, 'College of Humanities and Social Sciences',        'KNUST-HUSS'),
(1, 'College of Agriculture and Natural Resources',     'KNUST-CANR'),
-- UG
(2, 'College of Basic and Applied Sciences',            'UG-CBAS'),
(2, 'College of Health Sciences',                       'UG-CHS'),
(2, 'College of Humanities',                            'UG-HUM'),
(2, 'College of Education',                             'UG-EDU'),
(2, 'School of Law',                                    'UG-LAW'),
-- UCC
(3, 'College of Agriculture and Natural Sciences',      'UCC-CANS'),
(3, 'College of Education Studies',                     'UCC-EDU'),
(3, 'College of Health and Allied Sciences',            'UCC-CHAS'),
(3, 'College of Humanities and Legal Studies',          'UCC-HULS'),
(3, 'College of Distance Education',                    'UCC-CDE'),
-- UDS
(4, 'Faculty of Applied Sciences',                      'UDS-FAS'),
(4, 'Faculty of Agriculture',                           'UDS-FAG'),
(4, 'Faculty of Planning and Land Management',          'UDS-FPLM'),
-- UEW
(5, 'Faculty of Science Education',                     'UEW-FSE'),
(5, 'Faculty of Social Sciences Education',             'UEW-FSSE'),
(5, 'Faculty of Languages Education',                   'UEW-FLE'),
-- UMaT
(6, 'Faculty of Engineering',                           'UMAT-ENG'),
(6, 'Faculty of Geosciences',                           'UMAT-GEO'),
-- UENR
(7, 'School of Engineering',                            'UENR-ENG'),
(7, 'School of Natural Resources',                      'UENR-NR'),
-- UPSA
(8, 'Faculty of Accounting and Finance',                'UPSA-ACF'),
(8, 'Faculty of Management Studies',                    'UPSA-MGT'),
(8, 'Faculty of IT and Communication Studies',          'UPSA-IT'),
-- GIMPA
(9, 'Business School',                                  'GIMPA-BUS'),
(9, 'Faculty of Law',                                   'GIMPA-LAW'),
(9, 'School of Technology',                             'GIMPA-TECH'),
-- GCTU
(10, 'School of Computing and Information Systems',     'GCTU-CIS'),
(10, 'School of Engineering',                           'GCTU-ENG'),
-- UHAS
(11, 'School of Pharmacy',                              'UHAS-PHR'),
(11, 'School of Nursing and Midwifery',                 'UHAS-NUR'),
(11, 'School of Allied Health Sciences',                'UHAS-AHS');


-- ============================================================
--  TABLE: programmes
--  riasec_tags: R=Realistic, I=Investigative, A=Artistic,
--               S=Social, E=Enterprising, C=Conventional
-- ============================================================
CREATE TABLE IF NOT EXISTS programmes (
    id                  SERIAL PRIMARY KEY,
    name                VARCHAR(200) NOT NULL,
    degree_type         VARCHAR(20)  NOT NULL,  -- BSc, BA, BEd, LLB, etc.
    duration_years      INT          NOT NULL DEFAULT 4,
    field_category      VARCHAR(60)  NOT NULL,  -- Engineering, Health, Business, etc.
    riasec_tags         VARCHAR(20),            -- e.g. 'I,R' or 'E,C'
    shs_background      VARCHAR(200),           -- eligible SHS tracks
    core_subjects       TEXT,                   -- required core WASSCE subjects
    elective_subjects   TEXT,                   -- required elective subjects
    career_outcomes     TEXT,                   -- comma-separated career paths
    description         TEXT
);

-- ── ENGINEERING PROGRAMMES ─────────────────────────────────
INSERT INTO programmes (name, degree_type, duration_years, field_category, riasec_tags, shs_background, core_subjects, elective_subjects, career_outcomes, description) VALUES

('Computer Engineering',
 'BSc', 4, 'Engineering', 'I,R',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Elective Mathematics, Chemistry (or ICT)',
 'Software Engineer, Hardware Engineer, Embedded Systems Developer, IoT Engineer, Network Engineer',
 'Combines computer science theory with electronic engineering principles. Covers hardware design, software development, networking, and embedded systems.'),

('Computer Science',
 'BSc', 4, 'Computing & IT', 'I,C',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Elective Mathematics, Physics, Chemistry (or ICT)',
 'Software Developer, Data Scientist, AI Engineer, Systems Analyst, Cybersecurity Analyst',
 'Covers programming, algorithms, data structures, artificial intelligence, databases, and software engineering. Highly versatile degree with strong industry demand.'),

('Electrical and Electronic Engineering',
 'BSc', 4, 'Engineering', 'I,R',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Elective Mathematics, Chemistry (or Applied Electricity)',
 'Electrical Engineer, Electronics Engineer, Power Systems Engineer, Telecommunications Engineer',
 'Covers power systems, electronics, control systems, signals, and communications engineering.'),

('Biomedical Engineering',
 'BSc', 4, 'Engineering', 'I,R,S',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Chemistry, Elective Mathematics',
 'Biomedical Engineer, Medical Device Designer, Clinical Engineer, Biotech Researcher',
 'Applies engineering principles to medical and healthcare contexts. Involves medical device design, imaging systems, and biomechanics.'),

('Civil Engineering',
 'BSc', 4, 'Engineering', 'R,I',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Elective Mathematics, Chemistry (or Technical Drawing)',
 'Civil Engineer, Structural Engineer, Project Manager, Road/Highway Engineer',
 'Covers structural design, materials, geotechnics, water resources, transportation, and construction management.'),

('Mechanical Engineering',
 'BSc', 4, 'Engineering', 'R,I',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Elective Mathematics, Chemistry',
 'Mechanical Engineer, Automotive Engineer, Manufacturing Engineer, Energy Engineer',
 'Covers thermodynamics, fluid mechanics, materials science, manufacturing, and machine design.'),

('Chemical Engineering',
 'BSc', 4, 'Engineering', 'I,R',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Chemistry, Elective Mathematics',
 'Chemical Engineer, Petroleum Engineer, Process Engineer, Materials Scientist',
 'Applies chemistry and physics principles to design industrial processes. Covers thermodynamics, reaction engineering, and process control.'),

('Telecommunication Engineering',
 'BSc', 4, 'Engineering', 'I,R',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Elective Mathematics, Chemistry (or Applied Electricity)',
 'Telecom Engineer, Network Engineer, RF Engineer, Satellite Systems Engineer',
 'Focuses on wireless communications, signal processing, network design, and telecommunications infrastructure.'),

('Aerospace Engineering',
 'BSc', 4, 'Engineering', 'I,R',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Elective Mathematics, Chemistry',
 'Aerospace Engineer, Aviation Engineer, Defence Systems Engineer',
 'Covers aerodynamics, propulsion, aircraft structures, and space systems engineering.'),

('Petroleum Engineering',
 'BSc', 4, 'Engineering', 'R,I',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Chemistry, Elective Mathematics',
 'Petroleum Engineer, Reservoir Engineer, Drilling Engineer, Energy Consultant',
 'Covers oil and gas exploration, reservoir engineering, drilling, and production systems.'),

('Agricultural Engineering',
 'BSc', 4, 'Engineering', 'R,I',
 'General Science, Agriculture',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Chemistry, Elective Mathematics (or General Agriculture)',
 'Agricultural Engineer, Irrigation Engineer, Farm Equipment Designer, Agro-processing Engineer',
 'Applies engineering principles to agriculture, including irrigation systems, farm mechanisation, and food processing machinery.'),

('Mining Engineering',
 'BSc', 4, 'Engineering', 'R,I',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Chemistry, Elective Mathematics',
 'Mining Engineer, Mine Manager, Geotechnical Engineer, Quarrying Engineer',
 'Covers mine planning, excavation methods, safety, ventilation, and mineral processing. High-demand in Ghana''s gold mining sector.'),

('Geological Engineering',
 'BSc', 4, 'Engineering', 'R,I',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Chemistry, Elective Mathematics',
 'Geologist, Geotechnical Engineer, Environmental Geologist, Mineral Exploration Scientist',
 'Combines geology and engineering to assess geological conditions for construction and mineral extraction.'),

('Geomatic Engineering',
 'BSc', 4, 'Engineering', 'R,I,C',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Elective Mathematics, Geography (or Chemistry)',
 'Surveyor, GIS Analyst, Cartographer, Land Surveyor, Remote Sensing Specialist',
 'Also known as Geodetic Engineering. Covers land surveying, GPS, GIS, cartography, and remote sensing.'),

-- ── COMPUTING & IT ──────────────────────────────────────────
('Information Technology',
 'BSc', 4, 'Computing & IT', 'I,C',
 'General Science, Technical, Business, General Arts',
 'English Language, Core Mathematics, Integrated Science (or Social Studies)',
 'Elective Mathematics, Physics (or ICT), any one elective',
 'IT Support Specialist, Systems Administrator, Database Administrator, Web Developer',
 'Focuses on practical IT skills including networking, databases, web development, cybersecurity, and systems management.'),

('Cybersecurity',
 'BSc', 4, 'Computing & IT', 'I,R',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Elective Mathematics, Physics, ICT (or Chemistry)',
 'Cybersecurity Analyst, Ethical Hacker, Security Engineer, Digital Forensics Expert',
 'Covers network security, ethical hacking, cryptography, digital forensics, and information assurance.'),

('Software Engineering',
 'BSc', 4, 'Computing & IT', 'I,C',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Elective Mathematics, Physics, ICT (or Chemistry)',
 'Software Engineer, Mobile App Developer, DevOps Engineer, Full-Stack Developer',
 'Focuses on the systematic engineering approach to software design, development, testing, and maintenance.'),

-- ── HEALTH SCIENCES ─────────────────────────────────────────
('Human Biology (Medicine)',
 'BSc', 3, 'Health Sciences', 'I,S',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Physics (or Elective Mathematics)',
 'Medical Doctor (after MB ChB), Researcher, Academic, Medical Specialist',
 'Three-year BSc in Human Biology is followed by a 3-year clinical MB ChB programme. Total 6 years to become a medical doctor.'),

('Nursing',
 'BSc', 4, 'Health Sciences', 'S,I',
 'General Science, General Arts (some programmes)',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Physics (or Elective Mathematics)',
 'Registered Nurse, Nurse Educator, Clinical Nurse Specialist, Nurse Manager',
 'Covers anatomy, physiology, pharmacology, clinical nursing, and community health. Leads to licensure as a Registered Nurse.'),

('Midwifery',
 'BSc', 4, 'Health Sciences', 'S,I',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Physics',
 'Registered Midwife, Community Health Officer, Maternal Health Specialist',
 'Focuses on pregnancy care, labour management, postnatal care, and reproductive health. Highly in-demand across Ghana.'),

('Pharmacy (Pharm D)',
 'PharmD', 6, 'Health Sciences', 'I,S',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Chemistry, Biology, Physics (or Elective Mathematics)',
 'Pharmacist, Clinical Pharmacist, Pharmaceutical Researcher, Drug Regulatory Officer',
 'Six-year professional doctorate in pharmacy covering pharmacology, pharmaceutical sciences, and clinical pharmacy practice.'),

('Medical Laboratory Sciences',
 'BSc', 4, 'Health Sciences', 'I,R',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Physics (or Elective Mathematics)',
 'Medical Laboratory Scientist, Lab Manager, Haematologist, Clinical Microbiologist',
 'Covers haematology, microbiology, biochemistry, histopathology, and blood transfusion science.'),

('Doctor of Veterinary Medicine',
 'DVM', 6, 'Health Sciences', 'I,R,S',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Physics',
 'Veterinarian, Animal Health Officer, Livestock Farmer, Zoonotic Disease Researcher',
 'Six-year programme covering animal anatomy, surgery, internal medicine, public health, and food safety.'),

('Physician Assistantship',
 'BSc', 4, 'Health Sciences', 'S,I',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Physics',
 'Physician Assistant, Clinical Officer, Community Health Worker',
 'Trains mid-level healthcare providers who work under physician supervision to diagnose and treat patients.'),

('Doctor of Optometry',
 'OD', 6, 'Health Sciences', 'I,S',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Physics',
 'Optometrist, Eye Care Specialist, Vision Therapist',
 'Six-year programme covering ocular anatomy, optics, contact lenses, and eye disease management.'),

('Herbal Medicine',
 'BSc', 4, 'Health Sciences', 'I,S',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Physics',
 'Herbal Practitioner, Pharmaceutical Researcher, Natural Products Scientist',
 'Covers traditional African medicine, phytochemistry, pharmacognosy, and evidence-based herbal practice.'),

('Public Health',
 'BSc', 4, 'Health Sciences', 'S,I',
 'General Science, General Arts',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, any one elective',
 'Public Health Officer, Epidemiologist, Health Policy Analyst, NGO Health Programmes Officer',
 'Focuses on disease prevention, health promotion, epidemiology, biostatistics, and health systems management.'),

-- ── BUSINESS & MANAGEMENT ────────────────────────────────────
('Business Administration (Accounting & Banking)',
 'BSc', 4, 'Business', 'E,C',
 'Business, General Arts, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Economics/Accounting, Business Management, Elective Mathematics (or any elective)',
 'Accountant, Banker, Financial Analyst, Auditor, Tax Consultant',
 'Covers financial accounting, management accounting, banking, investment analysis, and auditing. Leads to professional accounting qualifications (ICAG, ACCA).'),

('Business Administration (Marketing)',
 'BSc', 4, 'Business', 'E,C',
 'Business, General Arts, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Economics, Business Management, any elective',
 'Marketing Manager, Brand Manager, Sales Executive, Digital Marketer, Market Researcher',
 'Covers marketing principles, consumer behaviour, advertising, digital marketing, and brand management.'),

('Business Administration (Human Resource Management)',
 'BSc', 4, 'Business', 'E,S',
 'Business, General Arts, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Economics, Business Management, any elective',
 'HR Manager, Talent Acquisition Specialist, Training & Development Officer, Labour Relations Officer',
 'Covers talent management, organisational behaviour, labour law, compensation, and performance management.'),

('Business Administration (Logistics & Supply Chain)',
 'BSc', 4, 'Business', 'E,C',
 'Business, General Arts, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Economics, Business Management, any elective',
 'Logistics Manager, Supply Chain Analyst, Procurement Officer, Port Operations Manager',
 'Covers supply chain management, operations, inventory control, port logistics, and procurement.'),

('Accounting',
 'BSc', 4, 'Business', 'C,E',
 'Business, General Arts',
 'English Language, Core Mathematics, Social Studies',
 'Financial Accounting, Cost Accounting, Business Management (or Economics)',
 'Chartered Accountant, Auditor, Financial Controller, Tax Advisor',
 'Professional accounting degree covering financial reporting, taxation, auditing, and management accounting.'),

('Marketing',
 'BSc', 4, 'Business', 'E,S',
 'Business, General Arts, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Economics, Business Management, any elective',
 'Marketing Executive, Brand Strategist, Digital Marketer, Advertising Account Manager',
 'Comprehensive marketing degree covering market research, advertising, digital strategy, and consumer insights.'),

-- ── ARTS, HUMANITIES & SOCIAL SCIENCES ───────────────────────
('Economics',
 'BA', 4, 'Arts & Social Sciences', 'I,E',
 'General Arts, Business, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Economics, Elective Mathematics, Government (or Geography)',
 'Economist, Financial Analyst, Policy Analyst, Development Economist, Data Analyst',
 'Covers microeconomics, macroeconomics, econometrics, development economics, and public policy.'),

('Political Science',
 'BA', 4, 'Arts & Social Sciences', 'S,E',
 'General Arts',
 'English Language, Core Mathematics, Social Studies',
 'Government, History, Economics (or Geography)',
 'Political Scientist, Diplomat, Policy Analyst, Civil Servant, Journalist, NGO Officer',
 'Covers political theory, comparative politics, international relations, public policy, and governance.'),

('Sociology and Social Work',
 'BA', 4, 'Arts & Social Sciences', 'S,I',
 'General Arts, Home Economics',
 'English Language, Core Mathematics, Social Studies',
 'Any three General Arts electives',
 'Social Worker, Community Development Officer, HR Officer, NGO Programme Coordinator',
 'Covers sociological theory, research methods, social welfare, community development, and social policy.'),

('Communication Studies',
 'BA', 4, 'Arts & Social Sciences', 'A,S,E',
 'General Arts, Business',
 'English Language, Core Mathematics, Social Studies',
 'Literature in English, any two General Arts electives',
 'Journalist, Media Manager, PR Officer, Content Creator, Corporate Communicator',
 'Covers journalism, media studies, public relations, advertising, and digital communication.'),

('Law (LLB)',
 'LLB', 4, 'Law', 'I,E',
 'General Arts, General Science, Business',
 'English Language, Core Mathematics, Social Studies (or Integrated Science)',
 'Any three credit electives',
 'Lawyer, Solicitor, Barrister, Legal Counsel, Judge, Law Lecturer',
 'Four-year undergraduate law programme covering contract law, tort, criminal law, constitutional law, and legal research. Students must pass the Ghana School of Law entrance exam after graduation to become lawyers.'),

('Geography and Rural Development',
 'BA', 4, 'Arts & Social Sciences', 'I,S,R',
 'General Arts, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Geography, Economics, Government (or any science elective)',
 'Urban Planner, Environmental Officer, GIS Analyst, Development Consultant',
 'Covers human geography, physical geography, regional development, GIS, and environmental studies.'),

('Psychology',
 'BSc', 4, 'Arts & Social Sciences', 'S,I',
 'General Arts, General Science',
 'English Language, Core Mathematics, Social Studies',
 'Any three elective subjects',
 'Psychologist, Counsellor, HR Officer, Social Worker, Mental Health Practitioner',
 'Covers human behaviour, cognitive psychology, developmental psychology, research methods, and mental health.'),

-- ── EDUCATION ────────────────────────────────────────────────
('Mathematics Education',
 'BEd', 4, 'Education', 'I,S',
 'General Science, General Arts',
 'English Language, Core Mathematics, Integrated Science',
 'Elective Mathematics, Physics, any one elective',
 'Mathematics Teacher, Curriculum Developer, Educational Researcher',
 'Prepares teachers to teach mathematics at JHS and SHS level. Combines mathematical content with pedagogy.'),

('Science Education',
 'BEd', 4, 'Education', 'I,S',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Chemistry, Biology (or Elective Mathematics)',
 'Science Teacher, Lab Technician, Educational Researcher',
 'Prepares science teachers specialising in Biology, Chemistry, or Physics for secondary schools.'),

('ICT Education',
 'BEd', 4, 'Education', 'I,S,C',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'ICT, Elective Mathematics, Physics',
 'ICT Teacher, Educational Technology Specialist, e-Learning Developer',
 'Prepares ICT teachers and covers computing, programming, network systems, and educational technology.'),

('English Language Education',
 'BEd', 4, 'Education', 'A,S',
 'General Arts',
 'English Language, Core Mathematics, Social Studies',
 'Literature in English, any two General Arts electives',
 'English Teacher, Curriculum Writer, Educational Researcher, Linguist',
 'Combines English linguistics, literature, and pedagogy to prepare English language teachers.'),

-- ── AGRICULTURE ──────────────────────────────────────────────
('Agriculture',
 'BSc', 4, 'Agriculture', 'R,I',
 'General Science, Agriculture',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, General Agriculture (or Physics)',
 'Agronomist, Agricultural Officer, Farm Manager, Agribusiness Manager',
 'Covers crop science, animal science, soil science, farm management, and agricultural economics.'),

('Agribusiness Management',
 'BSc', 4, 'Agriculture', 'E,I',
 'General Science, Business, Agriculture',
 'English Language, Core Mathematics, Integrated Science (or Social Studies)',
 'Economics, General Agriculture, Biology (or Business Management)',
 'Agribusiness Manager, Food Value Chain Analyst, Agricultural Marketer, Rural Development Officer',
 'Combines business management with agricultural economics. Covers supply chains, farm finance, and agri-markets.'),

('Food Science and Technology',
 'BSc', 4, 'Agriculture', 'I,R',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Physics (or General Agriculture)',
 'Food Scientist, Food Safety Inspector, Quality Control Officer, Product Developer',
 'Covers food processing, food safety, nutrition, quality assurance, and product development.'),

-- ── BUILT ENVIRONMENT & PLANNING ────────────────────────────
('Architecture',
 'BSc', 5, 'Built Environment', 'A,I,R',
 'General Science, Visual Arts, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Elective Mathematics, any one elective',
 'Architect, Urban Designer, Interior Designer, Building Consultant',
 'Five-year professional degree covering architectural design, structures, environmental design, and building technology. Requires design portfolio.'),

('Land Economy',
 'BSc', 4, 'Built Environment', 'I,E,C',
 'General Science, General Arts, Business',
 'English Language, Core Mathematics, Integrated Science (or Social Studies)',
 'Elective Mathematics, Economics, Geography (or Physics)',
 'Valuation Surveyor, Real Estate Appraiser, Property Developer, Land Administrator',
 'Covers property law, valuation, real estate finance, planning, and land administration.'),

('Development Planning',
 'BSc', 4, 'Built Environment', 'I,S,E',
 'General Arts, General Science, Business',
 'English Language, Core Mathematics, Social Studies',
 'Economics, Geography, Government (or any elective)',
 'Town Planner, Development Officer, Regional Planner, Urban Analyst',
 'Covers urban and regional planning, GIS, development economics, housing, and spatial analysis.'),

('Quantity Surveying and Construction Economics',
 'BSc', 4, 'Built Environment', 'R,C,E',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Elective Mathematics, Technical Drawing (or Chemistry)',
 'Quantity Surveyor, Cost Estimator, Project Manager, Construction Economist',
 'Covers cost planning, contract management, construction economics, and project procurement.'),

-- ── NATURAL RESOURCES & ENVIRONMENT ─────────────────────────
('Environmental Science',
 'BSc', 4, 'Natural Resources', 'I,R,S',
 'General Science',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Geography (or Physics)',
 'Environmental Officer, Conservation Biologist, Climate Change Analyst, EIA Consultant',
 'Covers ecology, environmental chemistry, pollution control, conservation, and environmental impact assessment.'),

('Natural Resources Management',
 'BSc', 4, 'Natural Resources', 'R,I',
 'General Science, Agriculture',
 'English Language, Core Mathematics, Integrated Science',
 'Biology, Chemistry, Geography',
 'Natural Resources Officer, Forest Officer, Wildlife Biologist, Conservation Manager',
 'Covers forest management, wildlife conservation, land use planning, and water resource management.'),

('Renewable Energy',
 'BSc', 4, 'Engineering', 'R,I',
 'General Science, Technical',
 'English Language, Core Mathematics, Integrated Science',
 'Physics, Elective Mathematics, Chemistry',
 'Renewable Energy Engineer, Solar Energy Technician, Energy Policy Analyst',
 'Covers solar, wind, hydro, and biomass energy systems. Design, installation, and management of clean energy projects.');


-- ============================================================
--  TABLE: university_programmes
--  Links universities to programmes with specific cutoff data
-- ============================================================
CREATE TABLE IF NOT EXISTS university_programmes (
    id                  SERIAL PRIMARY KEY,
    university_id       INT  NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    programme_id        INT  NOT NULL REFERENCES programmes(id)   ON DELETE CASCADE,
    wassce_cutoff       INT,         -- max aggregate (lower = more competitive)
    sssce_cutoff        INT,         -- SSSCE equivalent
    is_fee_paying       BOOLEAN DEFAULT FALSE,
    fee_paying_cutoff   INT,
    duration_override   INT,         -- if this uni's duration differs from programme default
    campus              VARCHAR(80) DEFAULT 'Main Campus',
    notes               TEXT,
    UNIQUE (university_id, programme_id, campus)
);

-- ─────────────────────────────────────────────────────────────
--  KNUST Cut-off Points (Source: Official 2024/2025 KNUST list)
-- ─────────────────────────────────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

-- Engineering
(1, (SELECT id FROM programmes WHERE name='Computer Engineering'),            12, 8,  'Main Campus', 'Physics, Elective Maths, Chemistry required; ICT acceptable in place of Chemistry'),
(1, (SELECT id FROM programmes WHERE name='Electrical and Electronic Engineering'), 9, 6, 'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Civil Engineering'),               10, 7,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Mechanical Engineering'),          10, 7,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Chemical Engineering'),            10, 7,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Biomedical Engineering'),          7,  5,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Aerospace Engineering'),           10, 7,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Petroleum Engineering'),           8,  6,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Agricultural Engineering'),        16, 11, 'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Geological Engineering'),          13, 9,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Geomatic Engineering'),            14, 10, 'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Telecommunication Engineering'),   12, 8,  'Main Campus', NULL),

-- Computing
(1, (SELECT id FROM programmes WHERE name='Computer Science'),                11, 8,  'Main Campus', 'Elective Maths required; Physics and ICT or Chemistry as electives'),

-- Health
(1, (SELECT id FROM programmes WHERE name='Human Biology (Medicine)'),        6,  4,  'Main Campus', 'BSc Human Biology leads to MB ChB after 3 further years of clinical study'),
(1, (SELECT id FROM programmes WHERE name='Nursing'),                         8,  6,  'Main Campus', 'Science background required; Biology and Chemistry mandatory'),
(1, (SELECT id FROM programmes WHERE name='Midwifery'),                       9,  6,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Pharmacy (Pharm D)'),              7,  5,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Medical Laboratory Sciences'),     7,  5,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Doctor of Veterinary Medicine'),   13, 9,  'Main Campus', 'FIRST CHOICE programmes only'),
(1, (SELECT id FROM programmes WHERE name='Physician Assistantship'),         8,  6,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Doctor of Optometry'),             6,  4,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Herbal Medicine'),                 15, 10, 'Main Campus', NULL),

-- Business
(1, (SELECT id FROM programmes WHERE name='Business Administration (Accounting & Banking)'), 8, 6, 'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Business Administration (Marketing)'), 12, 8, 'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Business Administration (Human Resource Management)'), 10, 7, 'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Business Administration (Logistics & Supply Chain)'), 11, 8, 'Main Campus', NULL),

-- Arts & Social Sciences
(1, (SELECT id FROM programmes WHERE name='Economics'),                       13, 9,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Political Science'),               12, 8,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Sociology and Social Work'),       14, 10, 'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Communication Studies'),           13, 9,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Law (LLB)'),                       7,  5,  'Main Campus', 'Highly competitive; all backgrounds welcome; interview may be required'),

-- Built Environment
(1, (SELECT id FROM programmes WHERE name='Architecture'),                    9,  6,  'Main Campus', 'Portfolio and interview required'),
(1, (SELECT id FROM programmes WHERE name='Land Economy'),                    9,  6,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Development Planning'),            10, 7,  'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Quantity Surveying and Construction Economics'), 11, 8, 'Main Campus', NULL),

-- Natural Resources
(1, (SELECT id FROM programmes WHERE name='Environmental Science'),           17, 12, 'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Agriculture'),                     22, 15, 'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Agribusiness Management'),         17, 12, 'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Food Science and Technology'),     14, 10, 'Main Campus', NULL),
(1, (SELECT id FROM programmes WHERE name='Natural Resources Management'),    18, 12, 'Main Campus', NULL);


-- ─────────────────────────────────────────────────────────────
--  UG (University of Ghana, Legon) Cut-off Points
--  General cutoff: Aggregate ≤ 24 for regular; ≤ 30 for distance
-- ─────────────────────────────────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

(2, (SELECT id FROM programmes WHERE name='Computer Science'),              24, 16, 'Legon Campus', 'BSc Computer Science; Elective Maths required; FIRST CHOICE programme'),
(2, (SELECT id FROM programmes WHERE name='Electrical and Electronic Engineering'), 24, 16, 'Legon Campus', 'BSc Computer Engineering also available; FIRST CHOICE'),
(2, (SELECT id FROM programmes WHERE name='Biomedical Engineering'),        24, 16, 'Legon Campus', 'FIRST CHOICE programme'),
(2, (SELECT id FROM programmes WHERE name='Information Technology'),        24, 16, 'Legon Campus', 'BSc Information Technology; FIRST CHOICE programme'),
(2, (SELECT id FROM programmes WHERE name='Human Biology (Medicine)'),      6,  4,  'Korle Bu Campus', 'MBChB Medicine; interview and entrance exam required; FIRST CHOICE only'),
(2, (SELECT id FROM programmes WHERE name='Nursing'),                       24, 16, 'Legon Campus', 'All health programmes may require interview'),
(2, (SELECT id FROM programmes WHERE name='Pharmacy (Pharm D)'),            24, 16, 'Legon Campus', NULL),
(2, (SELECT id FROM programmes WHERE name='Public Health'),                 24, 16, 'Legon Campus', NULL),
(2, (SELECT id FROM programmes WHERE name='Business Administration (Accounting & Banking)'), 24, 16, 'Legon Campus', 'BSc Administration - Accounting option'),
(2, (SELECT id FROM programmes WHERE name='Business Administration (Marketing)'), 24, 16, 'Legon Campus', NULL),
(2, (SELECT id FROM programmes WHERE name='Economics'),                     24, 16, 'Legon Campus', NULL),
(2, (SELECT id FROM programmes WHERE name='Political Science'),             24, 16, 'Legon Campus', NULL),
(2, (SELECT id FROM programmes WHERE name='Sociology and Social Work'),     24, 16, 'Legon Campus', NULL),
(2, (SELECT id FROM programmes WHERE name='Communication Studies'),         24, 16, 'Legon Campus', NULL),
(2, (SELECT id FROM programmes WHERE name='Law (LLB)'),                     24, 16, 'Legon Campus', 'Entrance exam required after admission; FIRST CHOICE'),
(2, (SELECT id FROM programmes WHERE name='Psychology'),                    24, 16, 'Legon Campus', NULL),
(2, (SELECT id FROM programmes WHERE name='Agriculture'),                   24, 16, 'Legon Campus', NULL),
(2, (SELECT id FROM programmes WHERE name='Food Science and Technology'),   24, 16, 'Legon Campus', NULL),
(2, (SELECT id FROM programmes WHERE name='Environmental Science'),         24, 16, 'Legon Campus', NULL);


-- ─────────────────────────────────────────────────────────────
--  UCC (University of Cape Coast)
--  General cutoff: Aggregate ≤ 24 (WASSCE), ≤ 16 (SSSCE)
-- ─────────────────────────────────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

(3, (SELECT id FROM programmes WHERE name='Computer Science'),              24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Information Technology'),        24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Nursing'),                       24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Public Health'),                 24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Medical Laboratory Sciences'),   24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Economics'),                     24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Law (LLB)'),                     24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Political Science'),             24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Sociology and Social Work'),     24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Psychology'),                    24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Communication Studies'),         24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Mathematics Education'),         24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Science Education'),             24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='ICT Education'),                 24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='English Language Education'),    24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Agriculture'),                   24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Food Science and Technology'),   24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Agribusiness Management'),       24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Environmental Science'),         24, 16, 'Main Campus', NULL),
(3, (SELECT id FROM programmes WHERE name='Doctor of Optometry'),           24, 16, 'Main Campus', NULL);


-- ─────────────────────────────────────────────────────────────
--  UDS (University for Development Studies)
--  Campuses: Tamale (main), Wa, Bolgatanga, Navrongo, Nyankpala
-- ─────────────────────────────────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

(4, (SELECT id FROM programmes WHERE name='Computer Science'),              24, 16, 'Tamale Campus', NULL),
(4, (SELECT id FROM programmes WHERE name='Agriculture'),                   24, 16, 'Nyankpala Campus', 'Strong agricultural focus; serves northern Ghana farming communities'),
(4, (SELECT id FROM programmes WHERE name='Agribusiness Management'),       24, 16, 'Nyankpala Campus', NULL),
(4, (SELECT id FROM programmes WHERE name='Food Science and Technology'),   24, 16, 'Nyankpala Campus', NULL),
(4, (SELECT id FROM programmes WHERE name='Nursing'),                       24, 16, 'Navrongo Campus', NULL),
(4, (SELECT id FROM programmes WHERE name='Public Health'),                 24, 16, 'Tamale Campus', NULL),
(4, (SELECT id FROM programmes WHERE name='Medical Laboratory Sciences'),   24, 16, 'Tamale Campus', NULL),
(4, (SELECT id FROM programmes WHERE name='Development Planning'),          24, 16, 'Tamale Campus', NULL),
(4, (SELECT id FROM programmes WHERE name='Economics'),                     24, 16, 'Tamale Campus', NULL),
(4, (SELECT id FROM programmes WHERE name='Sociology and Social Work'),     24, 16, 'Tamale Campus', NULL),
(4, (SELECT id FROM programmes WHERE name='Environmental Science'),         24, 16, 'Tamale Campus', NULL);


-- ─────────────────────────────────────────────────────────────
--  UEW (University of Education, Winneba)
--  Focus: Teacher education; multiple campuses
-- ─────────────────────────────────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

(5, (SELECT id FROM programmes WHERE name='Mathematics Education'),         24, 16, 'Winneba Campus', 'Prepares secondary school maths teachers'),
(5, (SELECT id FROM programmes WHERE name='Science Education'),             24, 16, 'Winneba Campus', NULL),
(5, (SELECT id FROM programmes WHERE name='ICT Education'),                 24, 16, 'Winneba Campus', NULL),
(5, (SELECT id FROM programmes WHERE name='English Language Education'),    24, 16, 'Winneba Campus', NULL),
(5, (SELECT id FROM programmes WHERE name='Economics'),                     24, 16, 'Winneba Campus', 'BSc Economics Education'),
(5, (SELECT id FROM programmes WHERE name='Political Science'),             24, 16, 'Kumasi Campus', NULL),
(5, (SELECT id FROM programmes WHERE name='Psychology'),                    24, 16, 'Winneba Campus', NULL),
(5, (SELECT id FROM programmes WHERE name='Physical Education'),            24, 16, 'Winneba Campus', 'Sports and Physical Education programme');


-- ─────────────────────────────────────────────────────────────
--  UMaT (University of Mines and Technology, Tarkwa)
-- ─────────────────────────────────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

(6, (SELECT id FROM programmes WHERE name='Mining Engineering'),            24, 16, 'Tarkwa Campus', 'Ghana''s leading mining engineering programme'),
(6, (SELECT id FROM programmes WHERE name='Geological Engineering'),        24, 16, 'Tarkwa Campus', NULL),
(6, (SELECT id FROM programmes WHERE name='Civil Engineering'),             24, 16, 'Tarkwa Campus', NULL),
(6, (SELECT id FROM programmes WHERE name='Mechanical Engineering'),        24, 16, 'Tarkwa Campus', NULL),
(6, (SELECT id FROM programmes WHERE name='Electrical and Electronic Engineering'), 24, 16, 'Tarkwa Campus', NULL),
(6, (SELECT id FROM programmes WHERE name='Computer Science'),              24, 16, 'Tarkwa Campus', 'BSc Computer Science and Engineering'),
(6, (SELECT id FROM programmes WHERE name='Environmental Science'),         24, 16, 'Tarkwa Campus', 'Focus on mining and environmental sustainability'),
(6, (SELECT id FROM programmes WHERE name='Geomatic Engineering'),          24, 16, 'Tarkwa Campus', NULL);


-- ─────────────────────────────────────────────────────────────
--  UENR (University of Energy and Natural Resources, Sunyani)
-- ─────────────────────────────────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

(7, (SELECT id FROM programmes WHERE name='Renewable Energy'),              24, 16, 'Sunyani Campus', 'Unique renewable energy engineering programme in Ghana'),
(7, (SELECT id FROM programmes WHERE name='Electrical and Electronic Engineering'), 24, 16, 'Sunyani Campus', 'Focus on energy systems'),
(7, (SELECT id FROM programmes WHERE name='Civil Engineering'),             24, 16, 'Sunyani Campus', NULL),
(7, (SELECT id FROM programmes WHERE name='Computer Science'),              24, 16, 'Sunyani Campus', NULL),
(7, (SELECT id FROM programmes WHERE name='Environmental Science'),         24, 16, 'Sunyani Campus', NULL),
(7, (SELECT id FROM programmes WHERE name='Natural Resources Management'),  24, 16, 'Sunyani Campus', NULL),
(7, (SELECT id FROM programmes WHERE name='Agriculture'),                   24, 16, 'Sunyani Campus', NULL);


-- ─────────────────────────────────────────────────────────────
--  UPSA (University of Professional Studies, Accra)
-- ─────────────────────────────────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

(8, (SELECT id FROM programmes WHERE name='Accounting'),                    24, 16, 'Accra Campus', 'Professionally accredited; recognized by ICAG'),
(8, (SELECT id FROM programmes WHERE name='Marketing'),                     24, 16, 'Accra Campus', NULL),
(8, (SELECT id FROM programmes WHERE name='Business Administration (Accounting & Banking)'), 24, 16, 'Accra Campus', NULL),
(8, (SELECT id FROM programmes WHERE name='Business Administration (Marketing)'), 24, 16, 'Accra Campus', NULL),
(8, (SELECT id FROM programmes WHERE name='Business Administration (Human Resource Management)'), 24, 16, 'Accra Campus', NULL),
(8, (SELECT id FROM programmes WHERE name='Law (LLB)'),                     24, 16, 'Accra Campus', 'Evening stream also available'),
(8, (SELECT id FROM programmes WHERE name='Information Technology'),        24, 16, 'Accra Campus', NULL),
(8, (SELECT id FROM programmes WHERE name='Economics'),                     24, 16, 'Accra Campus', NULL);


-- ─────────────────────────────────────────────────────────────
--  GIMPA
-- ─────────────────────────────────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

(9, (SELECT id FROM programmes WHERE name='Business Administration (Accounting & Banking)'), 36, 24, 'Achimota Campus', 'WASSCE cutoff 36; SSSCE cutoff 24 (GIMPA uses raw WASSCE totals)'),
(9, (SELECT id FROM programmes WHERE name='Business Administration (Human Resource Management)'), 36, 24, 'Achimota Campus', NULL),
(9, (SELECT id FROM programmes WHERE name='Business Administration (Marketing)'), 36, 24, 'Achimota Campus', NULL),
(9, (SELECT id FROM programmes WHERE name='Law (LLB)'),                     36, 24, 'Achimota Campus', 'Three streams: Day, Evening, Distance; Evening most popular'),
(9, (SELECT id FROM programmes WHERE name='Information Technology'),        36, 24, 'Achimota Campus', 'School of Technology; BSc in IT'),
(9, (SELECT id FROM programmes WHERE name='Political Science'),             36, 24, 'Achimota Campus', 'School of Public Service and Governance');


-- ─────────────────────────────────────────────────────────────
--  GCTU (Ghana Communication Technology University)
-- ─────────────────────────────────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

(10, (SELECT id FROM programmes WHERE name='Computer Science'),             24, 16, 'Accra Campus', 'Elective Maths required; ICT or Physics acceptable electives'),
(10, (SELECT id FROM programmes WHERE name='Cybersecurity'),                24, 16, 'Accra Campus', 'Specialist cybersecurity and digital forensics programme'),
(10, (SELECT id FROM programmes WHERE name='Software Engineering'),         24, 16, 'Accra Campus', NULL),
(10, (SELECT id FROM programmes WHERE name='Information Technology'),       24, 16, 'Accra Campus', NULL),
(10, (SELECT id FROM programmes WHERE name='Telecommunication Engineering'), 24, 16, 'Accra Campus', NULL),
(10, (SELECT id FROM programmes WHERE name='Electrical and Electronic Engineering'), 24, 16, 'Accra Campus', NULL),
(10, (SELECT id FROM programmes WHERE name='Business Administration (Accounting & Banking)'), 24, 16, 'Accra Campus', NULL);


-- ─────────────────────────────────────────────────────────────
--  UHAS (University of Health and Allied Sciences, Ho)
-- ─────────────────────────────────────────────────────────────
INSERT INTO university_programmes (university_id, programme_id, wassce_cutoff, sssce_cutoff, campus, notes) VALUES

(11, (SELECT id FROM programmes WHERE name='Pharmacy (Pharm D)'),           24, 16, 'Ho Campus', 'Specialist health university; strong clinical training'),
(11, (SELECT id FROM programmes WHERE name='Nursing'),                      24, 16, 'Ho Campus', NULL),
(11, (SELECT id FROM programmes WHERE name='Midwifery'),                    24, 16, 'Ho Campus', NULL),
(11, (SELECT id FROM programmes WHERE name='Medical Laboratory Sciences'),  24, 16, 'Ho Campus', NULL),
(11, (SELECT id FROM programmes WHERE name='Public Health'),                24, 16, 'Ho Campus', NULL),
(11, (SELECT id FROM programmes WHERE name='Physician Assistantship'),      24, 16, 'Ho Campus', NULL);


-- ============================================================
--  TABLE: riasec_questions  (Holland Career Interest Assessment)
--  20 questions — 3-4 per RIASEC type
-- ============================================================
CREATE TABLE IF NOT EXISTS riasec_questions (
    id          SERIAL PRIMARY KEY,
    question    TEXT NOT NULL,
    riasec_type CHAR(1) NOT NULL CHECK (riasec_type IN ('R','I','A','S','E','C')),
    option_yes  VARCHAR(100) DEFAULT 'Yes, I enjoy this',
    option_no   VARCHAR(100) DEFAULT 'No, not for me'
);

INSERT INTO riasec_questions (question, riasec_type) VALUES
-- Realistic (R)
('I enjoy building or fixing things with my hands (machines, electronics, or structures).', 'R'),
('I like working outdoors or with tools, plants, or animals.', 'R'),
('I prefer doing practical, hands-on tasks rather than reading or writing.', 'R'),
('I am interested in how engines, computers, or machines work mechanically.', 'R'),
-- Investigative (I)
('I enjoy solving puzzles, brain teasers, or complex problems.', 'I'),
('I like to research topics deeply and understand how and why things work.', 'I'),
('I am interested in science, mathematics, or data analysis.', 'I'),
('I enjoy conducting experiments or analyzing results.', 'I'),
-- Artistic (A)
('I enjoy creative activities like drawing, writing, music, or design.', 'A'),
('I like expressing ideas in original and imaginative ways.', 'A'),
('I prefer open-ended tasks where I can use my creativity.', 'A'),
('I am drawn to careers in film, fashion, architecture, or the arts.', 'A'),
-- Social (S)
('I enjoy helping people, teaching, or counselling others.', 'S'),
('I like working in teams and communicating with many different people.', 'S'),
('I care about social issues and want to make a positive impact on communities.', 'S'),
('I am interested in healthcare, social work, or education.', 'S'),
-- Enterprising (E)
('I enjoy leading groups, persuading others, or selling ideas.', 'E'),
('I am ambitious and enjoy taking risks to achieve business or organisational goals.', 'E'),
('I like planning projects, managing teams, or starting new ventures.', 'E'),
('I am interested in business, entrepreneurship, law, or politics.', 'E'),
-- Conventional (C)
('I enjoy organising information, keeping records, or working with data.', 'C'),
('I like structured tasks with clear rules and instructions.', 'C'),
('I am detail-oriented and prefer working with numbers, files, or spreadsheets.', 'C'),
('I am interested in accounting, administration, or finance.', 'C');


-- ============================================================
--  TABLE: application_steps
--  Step-by-step university application guide
-- ============================================================
CREATE TABLE IF NOT EXISTS application_steps (
    id              SERIAL PRIMARY KEY,
    university_id   INT REFERENCES universities(id),  -- NULL = applies to all
    step_number     INT NOT NULL,
    title           VARCHAR(150) NOT NULL,
    description     TEXT NOT NULL,
    deadline_note   VARCHAR(200),
    action_url      VARCHAR(200),
    applies_to_all  BOOLEAN DEFAULT FALSE
);

INSERT INTO application_steps (university_id, step_number, title, description, deadline_note, action_url, applies_to_all) VALUES

-- General steps for all universities
(NULL, 1, 'Check Your WASSCE Results',
 'Obtain your official WASSCE results slip from WAEC Ghana. Calculate your best 6-subject aggregate (3 core + 3 relevant electives). Grades D7, E8, F9 are not accepted for university admission.',
 'Results typically released September–October after May/June exams.',
 'https://www.waecgh.org', TRUE),

(NULL, 2, 'Calculate Your Aggregate',
 'Add your grades numerically: A1=1, B2=2, B3=3, C4=4, C5=4, C6=4. Sum your best 3 core subject grades and 3 elective grades. A lower total is better. Confirm which 6 subjects give you the lowest aggregate.',
 NULL, NULL, TRUE),

(NULL, 3, 'Use CareerPath GH to Find Your Eligible Programmes',
 'Enter your WASSCE results and interests into CareerPath GH to get a personalised list of programmes and universities you qualify for. Compare cutoff points with your aggregate to determine eligibility.',
 NULL, NULL, TRUE),

(NULL, 4, 'Purchase Application Voucher',
 'Buy the official application form/voucher from designated banks or online portals. Most universities sell forms between October and January. Each university requires a separate voucher.',
 'Voucher sales typically open October–January.',
 NULL, TRUE),

-- KNUST specific
(1, 5, 'Apply on the KNUST Portal',
 'Visit the KNUST admissions portal and create an account. Enter your WASSCE index number, select up to 3 programme choices in order of preference, upload required documents, and submit.',
 'KNUST application deadline is usually late January to early February.',
 'https://app.knust.edu.gh/admissions', FALSE),

(1, 6, 'Wait for Shortlisting & Entrance Exam (if required)',
 'Some KNUST programmes (e.g. Architecture, Law, Health Sciences) require an entrance exam or interview. Check your application status regularly on the admissions portal.',
 NULL, 'https://app.knust.edu.gh', FALSE),

(1, 7, 'Check Admission List',
 'KNUST publishes its admission list typically in April–May. Log into the admissions portal or check the official KNUST website. Your name, programme, and campus will be confirmed.',
 'Admission list usually released April–May.',
 'https://admissions.knust.edu.gh', FALSE),

(1, 8, 'Accept Admission & Pay Fees',
 'If admitted, log into the portal and formally accept your offer. Proceed to pay the required acceptance and registration fees at a designated bank or via the online payment system.',
 'Acceptance deadline is usually 2–4 weeks after admission list release.',
 NULL, FALSE),

(1, 9, 'Complete Registration & Report to Campus',
 'Visit KNUST campus during the designated registration period. Register for courses, collect your student ID, and complete documentation including medical screening.',
 'Registration week is typically September.',
 NULL, FALSE),

-- UG specific
(2, 5, 'Apply on the UG Admissions Portal',
 'Visit the University of Ghana admissions site. Create an account, enter your WASSCE results, select 3 programme choices, and upload your results slip. Submit before the deadline.',
 'UG application deadline is usually January to February.',
 'https://admissions.ug.edu.gh', FALSE),

(2, 6, 'Check Shortlisting for Health Programmes',
 'If applying to College of Health Sciences programmes, prepare for a possible entrance examination and interview. These are FIRST CHOICE only programmes.',
 NULL, NULL, FALSE),

(2, 7, 'Check UG Admission List',
 'UG admission list is published on the official admissions website. You will receive an email notification if shortlisted.',
 NULL, 'https://admissions.ug.edu.gh', FALSE),

-- General final steps
(NULL, 10, 'Prepare Required Documents',
 'Gather all required documents before reporting: (1) Original WASSCE results, (2) Birth Certificate, (3) Ghana Card or National ID, (4) Passport photograph, (5) Admission letter, (6) Vaccination/medical records.',
 'Prepare these well before resumption.',
 NULL, TRUE),

(NULL, 11, 'Arrange Accommodation',
 'Apply for university halls of residence immediately after receiving admission. Halls fill up quickly. Alternatively, research off-campus hostels near the university.',
 'Hall application opens shortly after admission list release.',
 NULL, TRUE),

(NULL, 12, 'Report and Begin Orientation',
 'Report to campus on the designated date. Attend orientation week to learn about university life, academic regulations, student services, and your faculty/department.',
 'Orientation typically held in September each academic year.',
 NULL, TRUE);


-- ============================================================
--  USEFUL VIEWS
-- ============================================================

-- View: Programmes with their offering universities and cutoffs
CREATE OR REPLACE VIEW v_programme_university_summary AS
SELECT
    p.name                  AS programme,
    p.degree_type,
    p.field_category,
    p.riasec_tags,
    p.shs_background,
    p.duration_years,
    u.short_name            AS university,
    u.location_city,
    u.region,
    up.wassce_cutoff,
    up.sssce_cutoff,
    up.campus,
    up.notes
FROM university_programmes up
JOIN programmes  p ON p.id = up.programme_id
JOIN universities u ON u.id = up.university_id
ORDER BY p.name, up.wassce_cutoff NULLS LAST;


-- View: Universities with programme counts
CREATE OR REPLACE VIEW v_university_overview AS
SELECT
    u.short_name,
    u.type,
    u.location_city,
    u.region,
    u.website,
    COUNT(up.id) AS total_programmes
FROM universities u
LEFT JOIN university_programmes up ON up.university_id = u.id
GROUP BY u.id, u.short_name, u.type, u.location_city, u.region, u.website
ORDER BY total_programmes DESC;


-- ============================================================
--  SAMPLE QUERIES (for CareerPath GH app backend)
-- ============================================================

-- 1. Find all universities offering a programme the student qualifies for:
-- SELECT * FROM v_programme_university_summary
-- WHERE programme = 'Computer Science'
--   AND wassce_cutoff >= :student_aggregate;

-- 2. Find all programmes a student qualifies for by aggregate and SHS background:
-- SELECT DISTINCT programme, degree_type, field_category, riasec_tags, university, wassce_cutoff, location_city
-- FROM v_programme_university_summary
-- WHERE wassce_cutoff >= :student_aggregate
--   AND shs_background ILIKE '%' || :student_shs_track || '%'
-- ORDER BY wassce_cutoff ASC;

-- 3. Get all programmes matching a RIASEC interest type:
-- SELECT name, degree_type, field_category, career_outcomes
-- FROM programmes
-- WHERE riasec_tags ILIKE '%' || :riasec_type || '%';

-- ============================================================
--  END OF SEED FILE
-- ============================================================
