/**
 * Nepali → English mapping dictionaries for entity names.
 * The ECN API returns all names in Nepali. These maps enable
 * English display when the user toggles language.
 */

// ─── Candidate Names (Manual mapping for correct English spellings) ─────
// Sanitized Nepali name → correct English name
// Names verified from official sources / widely accepted spellings
export const CANDIDATE_MAP = {
  // ── CPN-UML (नेकपा एमाले) ──────────────────────────────────
  "के.पी शर्मा ओली": "KP Sharma Oli",
  "के.पी. शर्मा ओली": "KP Sharma Oli",
  "घनश्याम खतीवडा": "Ghanashyam Bhattarai Khatiwada",
  "इश्वर पोखरेल": "Ishwor Pokhrel",
  "विष्णु प्रसाद पौडेल": "Bishnu Prasad Paudel",
  "प्रदिप यादव": "Pradeep Yadav",
  "सुर्य बहादुर थापा": "Surya Bahadur Thapa",
  "बद्री मैनाली": "Badri Mainali",
  "रामचन्द्र उप्रेती": "Ramchandra Upreti",
  "राजन भट्टराई": "Rajan Bhattarai",
  "मणिराम फुयाल": "Maniram Phuyal",
  "रामेश्‍वर फुयाल": "Rameshwor Phuyal",
  "दिलीप कुमार अग्रवाल": "Dilip Kumar Agrawal",
  "मनोज कुमार अग्रवाल": "Manoj Kumar Agrawal",
  "विनोद प्रसाद ढकाल": "Binod Prasad Dhakal",
  "अइन्द्र सुन्दर नेम्वाङ": "Aindra Sundar Nembang",
  "सोम प्रसाद मिश्र": "Som Prasad Mishra",
  "राजेश शाक्य": "Rajesh Shakya",
  "अजय क्रान्‍ती शाक्‍य": "Ajay Kranti Shakya",
  "विनोद श्रेष्‍ठ": "Binod Shrestha",
  "मोहन राज रेग्मी": "Mohan Raj Regmi",
  "प्रकाश श्रेष्ठ": "Prakash Shrestha",
  "महेश बस्नेत": "Mahesh Basnet",
  "चेत नाथ संजेल": "Chet Nath Sanjel",
  "दावा दोर्जे लामा": "Dawa Dorje Lama",
  "अस्‍मिन घिमिरे": "Asmin Ghimire",
  "शंकर राज थपलिया": "Shankar Raj Thapaliya",
  "केदार सिग्देल": "Kedar Sigdel",
  "दामोदर पौडेल वैरागी": "Damodar Paudel Bairagi",
  "रश्‍मि आचार्य": "Rashmi Acharya",
  "मिन प्रसाद गुरुङ्ग": "Min Prasad Gurung",
  "खिम बहादुर थापा": "Khim Bahadur Thapa",
  "भागिरथ सापकोटा": "Bhagiratha Sapkota",
  "दधिराम न्यौपाने": "Dadhiram Neupane",
  "खिम लाल भट्टराई": "Khim Lal Bhattarai",
  "बासु देव घिमिरे": "Basu Dev Ghimire",
  "प्रमोद कुमार यादव": "Pramod Kumar Yadav",
  "शंकर पोख्रेल": "Shankar Pokharel",
  "घनश्याम पाण्डे": "Ghanashyam Pandey",
  "रेवतीरमण शर्मा घिमिरे": "Rebatiram Sharma Ghimire",
  "सुर्य प्रसाद ढकाल": "Surya Prasad Dhakal",
  "सालीक राम अधिकारी": "Salik Ram Adhikari",
  "गौरी शंकर चौधरी": "Gauri Shankar Chaudhary",
  "लेख राज भट्ट": "Lekh Raj Bhatt",
  "यज्ञ राज ढुंगाना उपाध्याय": "Yagya Raj Dhungana Upadhyay",
  "ध्रुवकुमार शाही": "Dhruba Kumar Shahi",
  "कुलमणि देवकोटा": "Kulman Devkota",
  "लक्ष्मी प्रसाद पोखरेल": "Laxmi Prasad Pokharel",
  "श्री नगीन्द्र शाही": "Sri Nagindra Shahi",
  "दामोदर भण्डारी": "Damodar Bhandari",
  "गणेश सिंह ठगुन्ना": "Ganesh Singh Thagunna",

  // ── Nepali Congress (नेपाली काँग्रेस) ──────────────────────────
  "डा शेखर कोइराला": "Dr. Shekhar Koirala",
  "डा. शेखर कोइराला": "Dr. Shekhar Koirala",
  "विमलेन्द्र निधि": "Bimalendra Nidhi",
  "विजय कुमार गच्‍छदार": "Bijay Kumar Gachchhadar",
  "प्रदीप पौडेल": "Pradeep Paudel",
  "सचिन तिमल्सेना": "Sachin Timilsena",
  "रमेश अर्याल": "Ramesh Aryal",
  "नानु मैया बास्तोला": "Nanu Maiya Bastola",
  "प्रमोद हरि गुरागाई": "Pramod Hari Guragai",
  "कबिर शर्मा": "Kabir Sharma",
  "कृष्‍ण वानियाँ क्षेत्री": "Krishna Baniya Kshetri",
  "सपना राजभण्डारी": "Sapana Rajbhandari",
  "हिमाल कार्की": "Himal Karki",
  "प्रबल  थापा क्षेत्री": "Prabal Thapa Kshetri",
  "प्रबल थापा क्षेत्री": "Prabal Thapa Kshetri",
  "उदय शंशेर ज.ब.राणा": "Uday Shumsher JBR Rana",
  "प्रेम कृष्ण महर्जन": "Prem Krishna Maharjan",
  "जितेन्द्र कुमार श्रेष्ठ": "Jitendra Kumar Shrestha",
  "किरण न्यौपाने": "Kiran Neupane",
  "कविर राणा": "Kabir Rana",
  "मधु प्रसाद आचार्य": "Madhu Prasad Acharya",
  "गुणराज मुक्तान": "Gunraj Muktan",
  "राजेन्द्र प्रसाद वुर्लाकोटी": "Rajendra Prasad Burlakoti",
  "मिना कुमारी खरेल": "Mina Kumari Kharel",
  "टेक प्रसाद गुरुङ्ग": "Tek Prasad Gurung",
  "गम प्रसाद गुरुङ": "Gam Prasad Gurung",
  "तिलक बहादुर रानाभाट": "Tilak Bahadur Ranabhat",
  "माधव प्रसाद वांस्तोला": "Madhav Prasad Bastola",
  "मनोज गुरुङ्ग": "Manoj Gurung",
  "गोविन्द भट्टराई": "Govinda Bhattarai",
  "शंकर भण्डारी": "Shankar Bhandari",
  "भरत राज ढकाल": "Bharat Raj Dhakal",
  "भागवत प्रकाश मल्ल": "Bhagawat Prakash Malla",
  "चन्द्रकान्त भण्डारी": "Chandrakant Bhandari",
  "भुवन प्रसाद श्रेष्ठ": "Bhuwan Prasad Shrestha",
  "सन्दीप राना": "Sandeep Rana",
  "हिमाल दत्त श्रेष्ठ": "Himal Datta Shrestha",
  "हिरा बहादुर खत्री": "Hira Bahadur Khatri",
  "चुन्‍न प्रसाद शर्मा": "Chunna Prasad Sharma",
  "सुशील गुरुङ्ग": "Sushil Gurung",
  "भरत कुमार शाह": "Bharat Kumar Shah",
  "सुरेन्द्र राज आचार्य": "Surendra Raj Acharya",
  "अभिषेक प्रताप शाह": "Abhishek Pratap Shah",
  "विनोद कुमार चौधरी": "Binod Kumar Chaudhary",
  "भीम बहादुर थापा क्षेत्री": "Bhim Bahadur Thapa Kshetri",
  "योगेन्द्र चौधरी": "Yogendra Chaudhary",
  "किरण किशोर घिमिरे": "Kiran Kishor Ghimire",
  "दिपक गिरी": "Deepak Giri",
  "नारायण प्रसाद गौडेल": "Narayan Prasad Gaudel",
  "सुधान्सु कोइराला": "Sudhanshu Koirala",
  "अमर सिह पुन": "Amar Singh Pun",
  "संजय कुमार गौतम": "Sanjay Kumar Gautam",
  "किशोर सिह राठोर": "Kishor Singh Rathor",
  "विजय बहादुर स्वाँर": "Bijay Bahadur Swar",
  "भिम बडुवाल": "Bhim Baduwal",
  "गोरख बहादुर विष्ट": "Gorakh Bahadur Bist",
  "नर नारायण शाह": "Nar Narayan Shah",
  "विष्णु बहादुर खड्का": "Bishnu Bahadur Khadka",
  "नारायण कुमार कोइराला": "Narayan Kumar Koirala",
  "बासना थापा": "Basana Thapa",
  "दिक्पाल कुमार शाहि": "Dikpal Kumar Shahi",
  "भरत बहादुर खड्का": "Bharat Bahadur Khadka",
  "हर्ष बहादुर बम": "Harsh Bahadur Bam",
  "नैन सिंह महर": "Nain Singh Mahar",
  "नारायण प्रकाश साउद": "Narayan Prakash Saud",
  "हरि प्रसाद बोहरा": "Hari Prasad Bohara",

  // ── CPN-Maoist (माओवादी) ──────────────────────────────────────
  "खडग वहादुर विश्वकर्मा": "Khadga Bahadur Bishwokarma",
  "जनार्दन शर्मा": "Janardhan Sharma",
  "चन्द्र वहादुर वुढा": "Chandra Bahadur Budha",
  "शेखर नाथ आचार्य": "Shekhar Nath Acharya",
  "धनराज शाही": "Dhanraj Shahi",
  "प्रकास बुढाथोकी": "Prakas Budhathoki",
  "करिस्मा  खरेल": "Karisma Kharel",
  "करिस्मा खरेल": "Karisma Kharel",
  "ज्ञानेन्द्र प्रजापती": "Gyanendra Prajapati",
  "दिपक मानन्धर": "Deepak Manandhar",
  "सलाम सिंह लामा": "Salam Singh Lama",
  "माईला लामा": "Maila Lama",
  "राम कुमार भोम्‍जन": "Ram Kumar Bhomjan",
  "अष्ट राज बज्राचार्य": "Ashta Raj Bajracharya",
  "खगेन्द्र महर्जन": "Khagendra Maharjan",
  "भिमसेन घिमिरे": "Bhimsen Ghimire",
  "गणेश बहादुर श्रेष्ठ": "Ganesh Bahadur Shrestha",
  "दिर्शना कुमारी शाही": "Dirshana Kumari Shahi",
  "आशिक प्रसाद महतो": "Ashik Prasad Mahato",
  "प्रेम बहादुर थापा": "Prem Bahadur Thapa",
  "कमल खड्‍का विश्‍वकर्मा": "Kamal Khadka Bishwokarma",
  "ओम विक्रम पन्त": "Om Bikram Panta",
  "गणेश बहादुर लामगादे": "Ganesh Bahadur Lamagade",
  "चुडामणी वली": "Chudamani Wali",
  "सीता वि.क.": "Sita BK",
  "मदन बहादुर थारु": "Madan Bahadur Tharu",
  "विरेन्द्र वि.क": "Birendra BK",
  "विष्णु प्रसाद भट्टराई": "Bishnu Prasad Bhattarai",
  "विष्‍णु प्रसाद तिवारी": "Bishnu Prasad Tiwari",
  "शंकर प्रसाद ज्ञवाली": "Shankar Prasad Gyawali",
  "प्रकाश शाही": "Prakash Shahi",
  "दिपक वुढाथोकी": "Deepak Budhathoki",
  "महेन्द्र प्रकाश चन्द": "Mahendra Prakash Chand",
  "तिमोथी चौधरी": "Timothy Chaudhary",
  "टिकाराम चौधरी": "Tikaram Chaudhary",
  "अर्जुन प्रसाद कठरिया": "Arjun Prasad Kathariya",
  "दिल बहादुर साउँद": "Dil Bahadur Saund",
  "भक्त वहादुर शाही": "Bhakta Bahadur Shahi",
  "बबरजंग बहादुर सिंह": "Babarjang Bahadur Singh",
  "हिरु शाही": "Hiru Shahi",
  "धर्मराज देवकोटा": "Dharmaraj Devkota",
  "रामलाल बिश्वकर्मा": "Ramlal Bishwokarma",
  "कलम सिंह": "Kalam Singh",
  "संजय राई": "Sanjay Rai",
  "सन्तोष कटुवाल": "Santosh Katuwal",
  "तारा बहादुर थापा": "Tara Bahadur Thapa",
  "विजय नेम्वाङ": "Bijay Nembang",

  // ── RSP (राष्ट्रिय स्वतन्त्र पार्टी) ────────────────────────
  "रवि लामिछाने": "Rabi Lamichhane",
  "रवी लामिछाने": "Rabi Lamichhane",
  "वालेन्द्र शाह": "Balen Shah",

  // ── Progressive Democratic (प्रगतिशील लोकतान्त्रिक) ──────────
  "जनार्दन शर्मा": "Janardhan Sharma",

  // ── Rastriya Prajatantra Party ─────────────────────────────────

  // ── JSP ──────────────────────────────────────────────────────
  "हृदयेश त्रिपाठी": "Hridayesh Tripathi",

  // ── Jhapa-5 (Balen vs KP) featured candidates ─────────────────
  "मंधरा चिमरिया": "Mandhra Chimiriya",
  "रन्जित तामाङ": "Ranjit Tamang",
  "लक्ष्मी प्रसाद संग्रौला": "Laxmi Prasad Sangraula",
  "धिरेन सुब्बा": "Dhiren Subba",
  "अमृतलाल महतो": "Amritlal Mahato",
  "संजय राई": "Sanjay Rai",

  // ── Kalikot special ───────────────────────────────────────────
  "महेन्द्र बहादुर शाही": "Mahendra Bahadur Shahi",

  // ── Common candidate name patterns ────────────────────────────
  // These cover frequently occurring name parts
  "राम बहादुर विश्‍वकर्मा": "Ram Bahadur Bishwokarma",
  "खड्ग बहादुर कार्की": "Khadga Bahadur Karki",
  "डिल्ली राम नेपाली": "Dilli Ram Nepali",
  "मेघेन्द्र कुमार रोक्का": "Meghendra Kumar Rokka",
  "हरि बहादुर बस्नेत": "Hari Bahadur Basnet",
  "गंगा प्रसाद गिरी": "Ganga Prasad Giri",
  "कुमार प्रसाद खतिवडा": "Kumar Prasad Khatiwada",
  "दुर्गा बहादुर तामाङ्ग": "Durga Bahadur Tamang",
  "नरपती पौडेल": "Narpati Paudel",
  "नारदमणी साङपाङ्ग": "Naradmani Sangpang",
  "होम प्रसाद खतिवडा": "Hom Prasad Khatiwada",
  "सुहाङ नेम्बाङ": "Suhang Nembang",
  "लाल प्रसाद साँवा लिम्बू": "Lal Prasad Sawa Limbu",
};

// ─── Province / State Names ─────────────────────────────────────
export const PROVINCE_MAP = {
  "कोशी प्रदेश": "Koshi Province",
  "मधेश प्रदेश": "Madhesh Province",
  "वाग्मती प्रदेश": "Bagmati Province",
  "गण्डकी प्रदेश": "Gandaki Province",
  "लुम्बिनी प्रदेश": "Lumbini Province",
  "कर्णाली प्रदेश": "Karnali Province",
  "सुदूरपश्चिम प्रदेश": "Sudurpashchim Province",
};

// ─── District Names ─────────────────────────────────────────────
export const DISTRICT_MAP = {
  // Koshi Province
  "भोजपुर": "Bhojpur",
  "धनकुटा": "Dhankuta",
  "ईलाम": "Ilam",
  "इलाम": "Ilam",
  "झापा": "Jhapa",
  "खोटाङ": "Khotang",
  "मोरङ": "Morang",
  "ओखलढुङ्गा": "Okhaldhunga",
  "ओखलढुंगा": "Okhaldhunga",
  "पाँचथर": "Panchthar",
  "सङ्खुवासभा": "Sankhuwasabha",
  "संखुवासभा": "Sankhuwasabha",
  "सोलुखुम्बु": "Solukhumbu",
  "सुनसरी": "Sunsari",
  "ताप्लेजुङ": "Taplejung",
  "तेह्रथुम": "Terhathum",
  "उदयपुर": "Udayapur",

  // Madhesh Province
  "बारा": "Bara",
  "धनुषा": "Dhanusha",
  "महोत्तरी": "Mahottari",
  "पर्सा": "Parsa",
  "रौतहट": "Rautahat",
  "सप्तरी": "Saptari",
  "सर्लाही": "Sarlahi",
  "सिराहा": "Siraha",

  // Bagmati Province
  "भक्तपुर": "Bhaktapur",
  "चितवन": "Chitwan",
  "धादिङ": "Dhading",
  "दोलखा": "Dolakha",
  "काठमाडौं": "Kathmandu",
  "काभ्रेपलाञ्चोक": "Kavrepalanchok",
  "ललितपुर": "Lalitpur",
  "मकवानपुर": "Makwanpur",
  "नुवाकोट": "Nuwakot",
  "रामेछाप": "Ramechhap",
  "रसुवा": "Rasuwa",
  "सिन्धुपाल्चोक": "Sindhupalchok",
  "सिन्धुली": "Sindhuli",

  // Gandaki Province
  "बागलुङ": "Baglung",
  "बाग्लुङ": "Baglung",
  "गोरखा": "Gorkha",
  "कास्की": "Kaski",
  "लमजुङ": "Lamjung",
  "मनाङ": "Manang",
  "मुस्ताङ": "Mustang",
  "म्याग्दी": "Myagdi",
  "नवलपरासी (बर्दघाट सुस्ता पूर्व)": "Nawalparasi East",
  "पर्वत": "Parbat",
  "स्याङ्जा": "Syangja",
  "स्याङजा": "Syangja",
  "तनहुँ": "Tanahun",

  // Lumbini Province
  "अर्घाखाँची": "Arghakhanchi",
  "बाँके": "Banke",
  "बर्दिया": "Bardiya",
  "दाङ": "Dang",
  "गुल्मी": "Gulmi",
  "कपिलवस्तु": "Kapilvastu",
  "कपिलबस्तु": "Kapilvastu",
  "नवलपरासी (बर्दघाट सुस्ता पश्चिम)": "Nawalparasi West",
  "पाल्पा": "Palpa",
  "प्यूठान": "Pyuthan",
  "रोल्पा": "Rolpa",
  "रुकुम (पूर्वी भाग)": "Rukum East",
  "रूपन्देही": "Rupandehi",

  // Karnali Province
  "दैलेख": "Dailekh",
  "डोल्पा": "Dolpa",
  "हुम्ला": "Humla",
  "जाजरकोट": "Jajarkot",
  "जुम्ला": "Jumla",
  "कालिकोट": "Kalikot",
  "मुगु": "Mugu",
  "रुकुम पश्चिम": "Rukum West",
  "रुकुम (पश्चिमी भाग)": "Rukum West",
  "सल्यान": "Salyan",
  "सुर्खेत": "Surkhet",
  "पश्चिम रुकुम": "West Rukum",

  // Sudurpashchim Province
  "अछाम": "Achham",
  "बझाङ": "Bajhang",
  "बाजुरा": "Bajura",
  "बैतडी": "Baitadi",
  "डडेलधुरा": "Dadeldhura",
  "डोटी": "Doti",
  "कञ्चनपुर": "Kanchanpur",
  "कैलाली": "Kailali",
  "दार्चुला": "Darchula",
};

// ─── Party Names ────────────────────────────────────────────────
// Includes alternate API spellings so both variants map correctly
export const PARTY_MAP = {
  // CPN-UML (en-dash)
  "नेपाल कम्युनिष्ट पार्टी (एकीकृत मार्क्सवादी–लेनिनवादी)": "CPN (Unified Marxist-Leninist)",
  // CPN-UML (space – as returned by ECN API)
  "नेपाल कम्युनिष्ट पार्टी (एकीकृत मार्क्सवादी लेनिनवादी)": "CPN (Unified Marxist-Leninist)",
  // Nepali Congress (काङ्ग्रेस)
  "नेपाली काङ्ग्रेस": "Nepali Congress",
  // Nepali Congress (काँग्रेस – as returned by ECN API)
  "नेपाली काँग्रेस": "Nepali Congress",
  // CPN-Maoist variants (different spellings in API)
  "नेपाल कम्युनिष्ट पार्टी (माओवादी केन्द्र)": "CPN (Maoist Centre)",
  "नेपाल कम्युनिस्ट पार्टी (माओवादी केन्द्र)": "CPN (Maoist Centre)",
  // ** Actual ECN 2082 API name (without केन्द्र) **
  "नेपाल कम्युनिस्ट पार्टी (माओवादी)": "CPN (Maoist Centre)",
  "नेपाल कम्युनिष्ट पार्टी (माओवादी)": "CPN (Maoist Centre)",

  // Major parties from ECN 2082 API
  "राष्ट्रिय स्वतन्त्र पार्टी": "Rastriya Swatantra Party",
  "राष्ट्रिय प्रजातन्त्र पार्टी": "Rastriya Prajatantra Party",
  "जनता समाजवादी पार्टी, नेपाल": "Janata Samajwadi Party, Nepal",
  "लोकतान्त्रिक समाजवादी पार्टी, नेपाल": "Loktantrik Samajwadi Party, Nepal",
  "नागरिक उन्मुक्ति पार्टी": "Nagarik Unmukti Party",
  "नागरिक उन्मुक्ति पार्टी, नेपाल(एकल चुनाव चिन्ह)": "Nagarik Unmukti Party, Nepal",
  "जनमत पार्टी": "Janamat Party",
  "नेपाल मजदुर किसान पार्टी": "Nepal Majdoor Kisan Party",
  "स्वतन्त्र": "Independent",
  "राष्ट्रिय जनमोर्चा": "Rastriya Janamorcha",
  "नेपाल कम्युनिष्ट पार्टी (एकीकृत समाजवादी)": "CPN (Unified Socialist)",
  "जनता समाजवादी पार्टी नेपाल": "Janata Samajwadi Party Nepal",
  "जनता समाजवादी पार्टी(एकल चुनाव चिन्ह)": "Janata Samajwadi Party",
  "नेकपा (एकीकृत समाजवादी)": "CPN (Unified Socialist)",
  "नेपाल कम्युनिष्ट पार्टी (बहुमत)": "CPN (Bahumat)",
  "राष्ट्रिय जनता पार्टी नेपाल": "Rastriya Janata Party Nepal",
  "नेपाल कम्युनिष्ट पार्टी": "Nepal Communist Party",
  "नेपाली कम्युनिष्ट पार्टी": "Nepali Communist Party",
  "नेपाल कम्युनिष्ट पार्टी (संयुक्त)": "CPN (United)",
  "समाजवादी जनमोर्चा": "Samajwadi Janamorcha",
  "राप्रपा (संयुक्त)": "RPP (United)",
  "नेपाल परिवार दल": "Nepal Pariwar Dal",
  "हिन्दु हमारो राष्ट्र हमारो दल": "Hindu Hamro Rashtra Hamro Dal",
  "नवजनवादी श्रमिक मोर्चा": "Navajanwadi Shramik Morcha",
  "तराई मधेश लोकतान्त्रिक पार्टी": "Tarai Madhesh Loktantrik Party",
  "राष्ट्रिय प्रजातन्त्र पार्टी (एकीकृत)": "Rastriya Prajatantra Party (United)",
  "बहुजन समाज पार्टी, नेपाल": "Bahujan Samaj Party, Nepal",
  "सद्भावना पार्टी": "Sadbhawana Party",
  "संघीय समाजवादी फोरम, नेपाल": "Sanghiya Samajwadi Forum, Nepal",
  "तराई मधेश समृद्धि पार्टी": "Tarai Madhesh Samriddhi Party",
  "नेपाल सम्यक पार्टी": "Nepal Samyak Party",
  "राष्ट्रिय एकता पार्टी": "Rastriya Ekata Party",
  "जनप्रिय पार्टी": "Janapriya Party",

  // Additional parties from ECN 2082 API
  "प्रगतिशील लोकतान्त्रिक पार्टी": "Progressive Democratic Party",
  "मंगोल नेशनल अर्गनाइजेसन": "Mongol National Organization",
  "श्रम संस्कृति पार्टी": "Shram Sanskriti Party",
  "उज्यालो नेपाल पार्टी": "Ujyalo Nepal Party",
  "आम जनता पार्टी(एकल चुनाव चिन्ह)": "Aam Janata Party",
  "नेशनल रिपब्लिक नेपाल": "National Republic Nepal",
  "राष्ट्रिय मुक्ति पार्टी नेपाल(एकल चुनाव चिन्ह)": "Rastriya Mukti Party Nepal",
  "मितेरी पार्टी नेपाल": "Miteri Party Nepal",
  "संघीय लोकतान्त्रिक राष्ट्रिय मञ्च": "Federal Democratic National Forum",
  "संयुक्त नागरिक पार्टी": "Sanyukta Nagarik Party",
  "नेपाल जनता पार्टी": "Nepal Janata Party",
  "नेपाल जनमुक्ति पार्टी": "Nepal Janamukti Party",
  "राष्ट्रिय परिवर्तन पार्टी": "Rastriya Pariwartan Party",
  "राष्ट्रिय जनमुक्ति पार्टी": "Rastriya Janamukti Party",
  "जय मातृभूमि पार्टी": "Jai Matribhumi Party",
  "राष्ट्र निर्माण दल नेपाल": "Rashtra Nirman Dal Nepal",
  "नेपालका लागि नेपाली पार्टी": "Nepalka Lagi Nepali Party",
  "बहुजन शक्ति पार्टी": "Bahujan Shakti Party",
  "प्रगतिशील लोकतान्त्रिक पार्टी": "Progressive Democratic Party",
  "नेपाल कम्युनिष्ट पार्टी मार्क्सवादी (पुष्पलाल)": "CPN Marxist (Pushpalal)",
  "गतिशील लोकतान्त्रिक पार्टी": "Gatishil Loktantrik Party",
  "प्रजातान्त्रिक पार्टी नेपाल": "Prajatantrik Party Nepal",
  "बहुजन एकता पार्टी नेपाल(एकल चुनाव चिन्ह)": "Bahujan Ekta Party Nepal",
  "नेपाल संघीय समाजवादी पार्टी(एकल चुनाव चिन्ह)": "Nepal Federal Socialist Party",
  "समावेशी समाजवादी पार्टी": "Samabeshi Samajwadi Party",
  "सार्वभौम नागरिक पार्टी": "Sarbabhaum Nagarik Party",
  "नेपाल सद्भावना पार्टी": "Nepal Sadbhawana Party",
  "राष्ट्रिय साझा पार्टी": "Rastriya Sajha Party",
};

// ─── Devanagari → Roman Transliteration ─────────────────────────
// Basic character map covering common Nepali characters
const TRANSLIT_MAP = {
  // Vowels
  "अ": "a", "आ": "aa", "इ": "i", "ई": "ee", "उ": "u", "ऊ": "oo",
  "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au", "ऋ": "ri",
  // Vowel marks (matraa)
  "ा": "a", "ि": "i", "ी": "ee", "ु": "u", "ू": "oo",
  "े": "e", "ै": "ai", "ो": "o", "ौ": "au", "ृ": "ri",
  // Consonants
  "क": "ka", "ख": "kha", "ग": "ga", "घ": "gha", "ङ": "nga",
  "च": "cha", "छ": "chha", "ज": "ja", "झ": "jha", "ञ": "nya",
  "ट": "ta", "ठ": "tha", "ड": "da", "ढ": "dha", "ण": "na",
  "त": "ta", "थ": "tha", "द": "da", "ध": "dha", "न": "na",
  "प": "pa", "फ": "pha", "ब": "ba", "भ": "bha", "म": "ma",
  "य": "ya", "र": "ra", "ल": "la", "व": "wa", "श": "sha",
  "ष": "sha", "स": "sa", "ह": "ha", "क्ष": "ksha", "त्र": "tra",
  "ज्ञ": "gya",
  // Special
  "्": "", // halant - removes inherent vowel
  "ं": "n", // anusvara
  "ँ": "n", // chandrabindu
  "ः": "h", // visarga
  "।": ".", // purna viram
  "॥": ".", // double viram
  // Digits
  "०": "0", "१": "1", "२": "2", "३": "3", "४": "4",
  "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
};

/**
 * Transliterate a Devanagari string to Roman script.
 * This is a basic transliteration — not a perfect linguistic conversion,
 * but good enough for readable English display of names.
 */
function transliterate(devanagari) {
  if (!devanagari) return "";
  let result = "";
  let i = 0;
  const str = devanagari;

  while (i < str.length) {
    // Try two-character conjuncts first (e.g. क्ष, त्र, ज्ञ)
    if (i + 1 < str.length) {
      const twoChar = str[i] + str[i + 1];
      if (TRANSLIT_MAP[twoChar] !== undefined) {
        result += TRANSLIT_MAP[twoChar];
        i += 2;
        continue;
      }
    }

    const ch = str[i];

    if (ch === "्") {
      // Halant: remove the trailing 'a' from the previous consonant
      // by removing last char if it's 'a' and not the only char
      if (result.length > 0 && result[result.length - 1] === "a") {
        result = result.slice(0, -1);
      }
      i++;
      continue;
    }

    if (TRANSLIT_MAP[ch] !== undefined) {
      const mapped = TRANSLIT_MAP[ch];
      // If this is a vowel mark (matraa), replace the trailing inherent 'a'
      if ("ािीुूेैोौृ".includes(ch)) {
        if (result.length > 0 && result[result.length - 1] === "a") {
          result = result.slice(0, -1);
        }
        result += mapped;
      } else {
        result += mapped;
      }
    } else if (ch === " " || ch === "\t") {
      result += ch;
    } else if (ch === "\n" || ch === "\r") {
      result += " "; // Replace newlines with spaces
    } else {
      // Pass through (Latin chars, punctuation, etc.)
      result += ch;
    }
    i++;
  }

  // Capitalize first letter of each word
  return result.replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Public API ─────────────────────────────────────────────────

// Symbol name translations (Nepali → English)
export const SYMBOL_NAME_MAP = {
  "रुख": "Tree",
  "सुर्य": "Surya",
  "पाँचकुने तारा": "Hasiya Hatauda",
  "ढल्केको छाता": "Tilted Umbrella",
  "हलो": "Plow",
  "घण्टी": "Bell",
  "चकिया (जाँतो)": "Grinder (Jaato)",
  "गिलास": "Glass",
  "मादल": "Madal",
  "कुखुराको भाले": "Rooster",
  "घर": "House",
  "कलम": "Pen",
  "साइकल": "Bicycle",
  "धारा": "Water Tap",
  "कमलको फूल": "Lotus Flower",
  "हँसिया": "Sickle",
  "कोदालो": "Hoe",
  "बाँसुरी": "Flute",
  "ढाका टोपी": "Dhaka Topi",
  "डुङ्‌गा": "Boat",
  "ट्रयाक्टर": "Tractor",
  "बस": "Bus",
  "घोडा": "Horse",
  "भेडा": "Sheep",
  "भैँसी": "Buffalo",
  "रथ": "Chariot",
  "जग": "Jug",
  "तुलसी, मठ": "Tulsi Math",
  "पञ्जा छाप": "Palm Print",
  "लाउड स्पिकर": "Loudspeaker",
  "दायाँ हातले समातेको मसाल": "Torch Held in Right Hand",
  "बुल्डोजर": "Bulldozer",
  "चापाकल (ट्‍युवेल)": "Tubewell",
  "षटकोण": "Hexagon",
  "हात मिलाएको": "Handshake",
  "बलिरहेको दियो": "Burning Lamp",
  "दुई हात जोडेको नमस्कार": "Namaste (Folded Hands)",
  "दाप सहितको खुकुरी": "Khukuri with Sheath",
  "चङ्‌गा": "Kite",
  "भित्ते घडी": "Wall Clock",
  "गितार": "Guitar",
  "मोबाइल": "Mobile Phone",
  "ब्याट्री": "Battery",
  "सिट्ठी": "Whistle",
  "डोको": "Doko (Basket)",
  "रिक्सा": "Rickshaw",
  "बलिरहेको बिजुलीको चिम": "Burning Light Bulb",
  "आँप": "Mango",
  "अनार": "Pomegranate",
  "केराको काइँयो": "Banana Bunch",
  "फर्सी": "Pumpkin",
  "काउली": "Cauliflower",
};

/**
 * Translate a symbol name from Nepali to English.
 * @param {string} nepaliName — the Nepali symbol name from the API
 * @param {"en"|"ne"} lang — current language
 * @returns {string}
 */
export function translateSymbolName(nepaliName, lang) {
  if (!nepaliName) return "";
  if (lang === "ne") return nepaliName;
  const trimmed = nepaliName.trim();
  if (SYMBOL_NAME_MAP[trimmed]) return SYMBOL_NAME_MAP[trimmed];
  // Fallback: transliterate
  return transliterate(trimmed);
}

const MAPS = {
  province: PROVINCE_MAP,
  district: DISTRICT_MAP,
  party: PARTY_MAP,
};

/**
 * Translate an entity name from Nepali to English (if lang === "en")
 * or return the original Nepali name (if lang === "ne").
 *
 * @param {string} nepaliName  — the Nepali string from the API
 * @param {"province"|"district"|"party"} type — which map to use
 * @param {"en"|"ne"} lang — current language
 * @returns {string}
 */
export function translateEntity(nepaliName, type, lang) {
  if (!nepaliName) return "";
  if (lang === "ne") return nepaliName;

  const map = MAPS[type];
  if (!map) return nepaliName;

  // Sanitize: strip newlines, collapse spaces
  const sanitized = nepaliName.replace(/[\n\r]+/g, " ").replace(/\s+/g, " ").trim();

  // Exact match
  if (map[nepaliName]) return map[nepaliName];
  if (map[sanitized]) return map[sanitized];

  // Try trimmed match
  const trimmed = nepaliName.trim();
  if (map[trimmed]) return map[trimmed];

  // Partial match for parties (some names may differ slightly)
  if (type === "party") {
    for (const [key, value] of Object.entries(map)) {
      if (nepaliName.includes(key) || key.includes(nepaliName)) {
        return value;
      }
    }
  }

  // Fallback: transliterate
  return transliterate(nepaliName);
}

/**
 * Translate a candidate name.
 * First checks the manual CANDIDATE_MAP for correct English spelling,
 * then falls back to transliteration for unmapped candidates.
 *
 * @param {string} nepaliName
 * @param {"en"|"ne"} lang
 * @returns {string}
 */
export function translateCandidate(nepaliName, lang) {
  if (!nepaliName) return "";
  if (lang === "ne") return nepaliName;

  // Exact match in manual map
  if (CANDIDATE_MAP[nepaliName]) return CANDIDATE_MAP[nepaliName];

  // Try trimmed
  const trimmed = nepaliName.trim();
  if (CANDIDATE_MAP[trimmed]) return CANDIDATE_MAP[trimmed];

  // Try collapsing multiple spaces (API sometimes has double spaces)
  const collapsed = trimmed.replace(/\s+/g, " ");
  if (CANDIDATE_MAP[collapsed]) return CANDIDATE_MAP[collapsed];

  // Fallback: transliterate
  return transliterate(nepaliName);
}

/**
 * Build a reverse map (English → Nepali) for search support
 */
function buildReverseMap(map) {
  const reverse = {};
  for (const [ne, en] of Object.entries(map)) {
    reverse[en.toLowerCase()] = ne;
  }
  return reverse;
}

const REVERSE_PROVINCE = buildReverseMap(PROVINCE_MAP);
const REVERSE_DISTRICT = buildReverseMap(DISTRICT_MAP);
const REVERSE_PARTY = buildReverseMap(PARTY_MAP);

/**
 * Check if a search term matches an entity name in either language.
 * Returns true if the search string is found in the Nepali name OR
 * in its English translation.
 *
 * @param {string} nepaliValue — the original Nepali value
 * @param {string} search — the user's search input (lowercased)
 * @param {"province"|"district"|"party"|"candidate"} type
 * @returns {boolean}
 */
export function matchesBilingual(nepaliValue, search, type) {
  if (!nepaliValue || !search) return false;
  const lowerNe = nepaliValue.toLowerCase();
  if (lowerNe.includes(search)) return true;

  // Also check English translation
  let englishValue = "";
  if (type === "candidate") {
    // Check manual map first, fallback to transliteration
    const collapsed = nepaliValue.trim().replace(/\s+/g, " ");
    englishValue = CANDIDATE_MAP[nepaliValue] || CANDIDATE_MAP[collapsed] || transliterate(nepaliValue);
  } else {
    const map = MAPS[type];
    if (map && map[nepaliValue]) {
      englishValue = map[nepaliValue];
    } else {
      englishValue = transliterate(nepaliValue);
    }
  }
  return englishValue.toLowerCase().includes(search);
}
