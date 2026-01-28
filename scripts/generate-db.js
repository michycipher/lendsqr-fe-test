import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants (copied from your constants.ts)
const NIGERIAN_FIRST_NAMES = [
  'Adebayo', 'Chioma', 'Oluwaseun', 'Fatima', 'Ibrahim', 
  'Ngozi', 'Emeka', 'Aminat', 'Chukwudi', 'Blessing',
  'Adeola', 'Chiamaka', 'Tunde', 'Zainab', 'Ifeanyi',
  'Grace', 'Segun', 'Hauwa', 'Chinedu', 'Funmilayo',
  'Babatunde', 'Amaka', 'Kunle', 'Aisha', 'Obinna',
  'Nneka', 'Femi', 'Khadija', 'Ikechukwu', 'Josephine',
  'Adeyemi', 'Chidinma', 'Yusuf', 'Shade', 'Chidi',
  'Victoria', 'Olu', 'Maryam', 'Uche', 'Deborah',
  'Tosin', 'Folake', 'Ahmed', 'Joy', 'Kemi',
  'Bukola', 'Lanre', 'Hassana', 'Nnamdi', 'Patience'
];

const NIGERIAN_LAST_NAMES = [
  'Adeyemi', 'Okafor', 'Ibrahim', 'Musa', 'Olowo',
  'Nwosu', 'Bello', 'Okonkwo', 'Mohammed', 'Adebayo',
  'Eze', 'Yusuf', 'Obi', 'Hassan', 'Okoro',
  'Aliyu', 'Chukwu', 'Suleiman', 'Ojo', 'Abubakar',
  'Nwankwo', 'Abdullahi', 'Chukwuma', 'Usman', 'Ike',
  'Garba', 'Okoye', 'Bashir', 'Onyeka', 'Lawal',
  'Chibueze', 'Ismail', 'Nwachukwu', 'Bala', 'Nnamdi',
  'Sani', 'Onyebuchi', 'Mustapha', 'Emeka', 'Audu',
  'Ifeanyi', 'Umar', 'Ogbonna', 'Aliyu', 'Ezeh',
  'Dauda', 'Nwankwo', 'Sadiq', 'Udoka', 'Tanko'
];

const ORGANIZATIONS = ['Lendsqr', 'Irorun', 'Lendstar'];
const USER_STATUSES = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
const EDUCATION_LEVELS = ['SSCE', 'OND', 'HND', 'B.Sc', 'M.Sc', 'Ph.D'];
const EMPLOYMENT_STATUSES = ['Employed', 'Self-employed', 'Unemployed'];
const EMPLOYMENT_SECTORS = [
  'FinTech', 'Education', 'Healthcare', 'Technology',
  'Agriculture', 'Manufacturing', 'Retail', 'Entertainment',
  'Real Estate', 'Transportation'
];
const NIGERIAN_BANKS = [
  'Access Bank', 'GTBank', 'First Bank', 'UBA',
  'Zenith Bank', 'Providus Bank', 'Wema Bank', 'Fidelity Bank',
  'Union Bank', 'Sterling Bank', 'Stanbic IBTC', 'Polaris Bank'
];
const MARITAL_STATUSES = ['Single', 'Married', 'Divorced', 'Widowed'];
const RESIDENCE_TYPES = [
  "Parent's Apartment",
  "Own Apartment",
  "Rented Apartment",
  "Company Accommodation"
];
const GENDERS = ['Male', 'Female'];
const RELATIONSHIPS = [
  'Father', 'Mother', 'Brother', 'Sister',
  'Uncle', 'Aunt', 'Cousin', 'Friend', 'Colleague'
];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const generatePhoneNumber = () => {
  const prefixes = ['0803', '0806', '0810', '0813', '0814', '0816', '0903', '0906', '0913'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = String(Math.floor(Math.random() * 10000000)).padStart(7, '0');
  return `${prefix}${suffix}`;
};

const generateRandomDate = (startYear, endYear) => {
  const year = startYear + Math.floor(Math.random() * (endYear - startYear + 1));
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(year, month, day).toISOString();
};

const formatCurrency = (amount) => {
  return `₦${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

const generateMockUsers = (count) => {
  const users = [];

  for (let i = 1; i <= count; i++) {
    const firstName = getRandomItem(NIGERIAN_FIRST_NAMES);
    const lastName = getRandomItem(NIGERIAN_LAST_NAMES);
    const fullName = `${firstName} ${lastName}`;
    const username = `${firstName.toLowerCase()}${i}`;
    const email = `${username}@${getRandomItem(['gmail', 'yahoo', 'outlook'])}.com`;

    const minIncome = Math.floor(Math.random() * 300000) + 50000;
    const maxIncome = minIncome + Math.floor(Math.random() * 400000) + 100000;
    const loanRepayment = Math.floor(Math.random() * 80000) + 10000;
    const accountBalance = Math.floor(Math.random() * 5000000);

    const guarantorFirstName = getRandomItem(NIGERIAN_FIRST_NAMES);
    const guarantorLastName = getRandomItem(NIGERIAN_LAST_NAMES);

    users.push({
      id: `LSQ${String(i).padStart(8, '0')}`,
      organization: getRandomItem(ORGANIZATIONS),
      username,
      email,
      phoneNumber: generatePhoneNumber(),
      dateJoined: generateRandomDate(2019, 2023),
      status: getRandomItem(USER_STATUSES),
      fullName,
      bvn: String(Math.floor(Math.random() * 10000000000) + 10000000000).substring(0, 11),
      gender: getRandomItem(GENDERS),
      maritalStatus: getRandomItem(MARITAL_STATUSES),
      children: String(Math.floor(Math.random() * 6)),
      typeOfResidence: getRandomItem(RESIDENCE_TYPES),
      levelOfEducation: getRandomItem(EDUCATION_LEVELS),
      employmentStatus: getRandomItem(EMPLOYMENT_STATUSES),
      sectorOfEmployment: getRandomItem(EMPLOYMENT_SECTORS),
      durationOfEmployment: `${Math.floor(Math.random() * 15) + 1} years`,
      officeEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      monthlyIncome: `₦${minIncome.toLocaleString()} - ₦${maxIncome.toLocaleString()}`,
      loanRepayment: String(loanRepayment),
      twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      facebook: fullName,
      instagram: `@${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      guarantorFullName: `${guarantorFirstName} ${guarantorLastName}`,
      guarantorPhoneNumber: generatePhoneNumber(),
      guarantorEmailAddress: `${guarantorFirstName.toLowerCase()}${i}@gmail.com`,
      guarantorRelationship: getRandomItem(RELATIONSHIPS),
      accountBalance: formatCurrency(accountBalance),
      accountNumber: String(Math.floor(Math.random() * 10000000000)).padStart(10, '0'),
      bankName: getRandomItem(NIGERIAN_BANKS)
    });
  }

  return users;
};


// console.log('Generating 500 users...');
const users = generateMockUsers(500);

const data = {
  users: users
};

const outputPath = path.join(__dirname, '..', 'db.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

// console.log('Successfully created db.json with 500 users!');
// console.log('Total users:', users.length);
// console.log('File location:', outputPath);
// console.log('File size:', (fs.statSync(outputPath).size / 1024).toFixed(2), 'KB');
// console.log('\n Next steps:');
// console.log('1. git add db.json');
// console.log('2. git commit -m "Add mock API data"');
// console.log('3. git push');
// console.log('4. my API will be at: https://my-json-server.typicode.com/michycipher/lendsqr-fe-test/users');