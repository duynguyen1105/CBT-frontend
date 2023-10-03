import imgReading from 'assets/images/reading.png';

export enum CreateClassesTabs {
  SETTING = 'Setting',
  MEMBER = 'Member',
  CONTENT = 'Content',
}

export enum StatusTest {
  UP_COMMING = 'UpComming',
  PREVIOUS = 'Previous',
}

export const TestTicketData = [
  {
    cate: 'Test',
    title: 'Test ticket 1',
  },
  {
    cate: 'Ielts',
    title: 'Test Ielts Writting',
  },
  {
    cate: 'Toeic',
    title: 'Test Toeic listening 1',
  },
];

export enum StatusClasses {
  IN_PROGRESS = 'In Progress',
  CLOSED = 'Closed',
}

export const DataClasses = [
  {
    id: '01',
    classID: 'CB15-090',
    className: 'IELTS Begin level 1',
    teacher: 'IELTS Advanced',
    startTime: '20-12-2022',
    endTime: '20-02-2022',
    status: StatusClasses.IN_PROGRESS,
  },
  {
    id: '02',
    classID: 'CB15-090',
    className: 'TOEIC Mock Test 2023',
    teacher: 'TOEIC Beginer',
    startTime: '20-01-2023',
    endTime: '20-07-2023',
    status: StatusClasses.IN_PROGRESS,
  },
  {
    id: '03',
    classID: 'CB15-090',
    className: 'IELTS Mock Test 2023',
    teacher: 'IELTS Advanced',
    startTime: '20-12-2022',
    endTime: '20-02-2022',
    status: StatusClasses.IN_PROGRESS,
  },
  {
    id: '04',
    classID: 'CB15-090',
    className: 'IELTS Begin level 1',
    teacher: 'IELTS Advanced',
    startTime: '20-12-2022',
    endTime: '20-02-2022',
    status: StatusClasses.CLOSED,
  },
  {
    id: '05',
    classID: 'CB15-090',
    className: 'TOEIC Begin level 1',
    teacher: 'TOEIC Advanced',
    startTime: '20-12-2022',
    endTime: '20-02-2022',
    status: StatusClasses.CLOSED,
  },
];

export const MemberData = [
  {
    id: 'CB15-090',
    fullName: 'Nguyễn Văn A',
    email: 'anguyenvan@gmail.com',
  },
  {
    id: 'CB15-090',
    fullName: 'Nguyễn Văn B',
    email: 'bnguyenvan@gmail.com',
  },
  {
    id: 'CB15-090',
    fullName: 'Nguyễn Văn C',
    email: 'cnguyenvan@gmail.com',
  },
];

export const TestCardData = [
  {
    id: '01',
    category: 'TOEIC Test 1',
    date: '27 Nov',
    time: '07:00 AM - 11:00 AM',
    title: 'GT Writing Test - Informal Letters',
    user: {
      name: 'Daniel H.',
      classes: 'Expert IELTS instructor and assessor',
    },
    type: StatusClasses.IN_PROGRESS,
  },
  {
    id: '02',
    category: 'TOEIC Test 1',
    date: '27 Nov',
    time: '07:00 AM - 11:00 AM',
    title: 'GT Writing Test - Informal Letters',
    user: {
      name: 'Daniel H.',
      classes: 'Expert IELTS instructor and assessor',
    },
    type: StatusClasses.IN_PROGRESS,
  },
  {
    id: '03',
    category: 'TOEIC Test 1',
    date: '27 Nov',
    time: '07:00 AM - 11:00 AM',
    title: 'GT Writing Test - Informal Letters',
    user: {
      name: 'Daniel H.',
      classes: 'Expert IELTS instructor and assessor',
    },
    type: StatusClasses.CLOSED,
    score: 9,
  },
  {
    id: '04',
    category: 'TOEIC Test 1',
    date: '27 Nov',
    time: '07:00 AM - 11:00 AM',
    title: 'GT Writing Test - Informal Letters',
    user: {
      name: 'Daniel H.',
      classes: 'Expert IELTS instructor and assessor',
    },
    type: StatusClasses.CLOSED,
    score: 4,
  },
  {
    id: '05',
    category: 'TOEIC Test 1',
    date: '27 Nov',
    time: '07:00 AM - 11:00 AM',
    title: 'GT Writing Test - Informal Letters',
    user: {
      name: 'Daniel H.',
      classes: 'Expert IELTS instructor and assessor',
    },
    type: StatusClasses.CLOSED,
    score: 6,
  },
  {
    id: '06',
    category: 'TOEIC Test 1',
    date: '27 Nov',
    time: '07:00 AM - 11:00 AM',
    title: 'GT Writing Test - Informal Letters',
    user: {
      name: 'Daniel H.',
      classes: 'Expert IELTS instructor and assessor',
    },
    type: StatusClasses.CLOSED,
    score: 2,
  },
];

export const DataReadingPart1 = {
  title: 'Reading Part 1',
  image: imgReading,
  desc: 'Money Transfers by Mobile A. The ping of a text message has never sounded so sweet. In what is being touted as a world first, Kenya’s biggest mobile operator is allowing subscribers to send cash to other phone users by SMS. Known as M-Pesa, or mobile money, the service is expected to revolutionise banking in a country where more than 80% of people are excluded from the formal financial sector. Apart from transferring cash - a service much in demand among urban Kenyans supporting relatives in rural areas - customers of the Safaricom network will be able to keep up to 50,000 shillings (£370) in a “virtual account” on their handsets. B. Developed by Vodafone, which holds a 35% share in Safaricom, M-Pesa was formally launched in Kenya two weeks ago. More than 10,000 people have signed up for the service, with around 8 million shillings transferred so far, mostly in tiny denominations. Safaricom’s executives are confident that growth will be strong in Kenya, and later across Africa. “We are effectively giving people ATM cards without them ever having to open a real bank account,” said Michael Joseph, chief executive of Safaricom, who called the money transfer concept the “next big thing” in mobile telephony.',
};

export const DataReadingPart2 = {
  title: 'Reading Part 2',
  image: imgReading,
  desc: 'Money Transfers by Part 2 A. The ping of a text message has never sounded so sweet. In what is being touted as a world first, Kenya’s biggest mobile operator is allowing subscribers to send cash to other phone users by SMS. Known as M-Pesa, or mobile money, the service is expected to revolutionise banking in a country where more than 80% of people are excluded from the formal financial sector. Apart from transferring cash - a service much in demand among urban Kenyans supporting relatives in rural areas - customers of the Safaricom network will be able to keep up to 50,000 shillings (£370) in a “virtual account” on their handsets. B. Developed by Vodafone, which holds a 35% share in Safaricom, M-Pesa was formally launched in Kenya two weeks ago. More than 10,000 people have signed up for the service, with around 8 million shillings transferred so far, mostly in tiny denominations. Safaricom’s executives are confident that growth will be strong in Kenya, and later across Africa. “We are effectively giving people ATM cards without them ever having to open a real bank account,” said Michael Joseph, chief executive of Safaricom, who called the money transfer concept the “next big thing” in mobile telephony.',
};
