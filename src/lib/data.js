export const markBrackets ={
    name:'Student Distribution',
    children: [
        {
          name: "0%-10%",
          children: [
            { name: "Aarav Nair", value: 8 },
            { name: "Saanvi Das", value: 9 }
          ]
        },
        {
          name: "10%-20%",
          children: [
            { name: "Ishaan Gupta", value: 12 },
            { name: "Meera Menon", value: 18 }
          ]
        },
        {
          name: "20%-30%",
          children: [
            { name: "Aditya Pillai", value: 25 },
            { name: "Riya Sharma", value: 27 }
          ]
        },
        {
          name: "30%-40%",
          children: [
            { name: "Krishna Reddy", value: 31 },
            { name: "Ananya Iyer", value: 36 }
          ]
        },
        {
          name: "40%-50%",
          children: [
            { name: "Varun Chopra", value: 42 },
            { name: "Diya Bansal", value: 48 }
          ]
        },
        {
          name: "50%-60%",
          children: [
            { name: "Karan Verma", value: 52 },
            { name: "Aditi Jain", value: 57 },
            { name: "Mohmd Jaleel AbdulKhader", value: 57 },
          ]
        },
        {
          name: "60%-70%",
          children: [
            { name: "Rohan Singh", value: 61 },
            { name: "Neha Kulkarni", value: 63 },
            { name: "Aryan Mishra", value: 65 },
            { name: "Sneha Patil", value: 67 },
            { name: "Vikram Rao", value: 69 },
            { name: "Pooja Thakur", value: 62 },
            { name: "Rajesh Kumar", value: 64 },
            { name: "Priya Joshi", value: 66 },
            { name: "Aakash Yadav", value: 68 },
            { name: "Prakash Yadav", value: 58 },
            { name: "Savakash Yadav", value: 58 },
       
          ]
        },
        {
          name: "70%-80%",
          children: [
            { name: "Nikita Mehta", value: 71 },
            { name: "Harsh Vardhan", value: 75 }
          ]
        },
        {
          name: "80%-90%",
          children: [
            { name: "Siddharth Das", value: 82 },
            { name: "Kriti Ghosh", value: 87 }
          ]
        },
        {
          name: "90%-100%",
          children: [
            { name: "Tanya Roy", value: 92 },
            { name: "Arjun Banerjee", value: 97 },
            { name: "Arjun Banerjee", value: 97 },
            { name: "Arjun Banerjee", value: 97 },
            { name: "Arjun Banerjee", value: 97 },
            { name: "Arjun Banerjee", value: 97 },
          ]
        }
      ]
};
  

export const aiResponse = [
  {
    type: 'paragraph',
    content: 'Sure! Here’s a quick analysis of your performance based on the recent tests.'
  },
  {
    type: 'table',
    content: [
      ['Metric', 'Your Score', 'Class Average'],
      ['Accuracy', '85%', '78%'],
      ['Speed', '42 Q/min', '39 Q/min'],
      ['Completion Rate', '95%', '88%']
    ]
  },
  {
    type: 'paragraph',
    content: 'Here is the formula we used to calculate your accuracy:'
  },
  {
    type: 'code',
    content: 'accuracy = (correct_answers / total_questions) * 100'
  },
  {
    type: 'paragraph',
    content: 'Based on this, here are some suggested next steps for improvement:'
  },
  {
    type: 'list',
    content: [
      'Focus more on chapters with low accuracy.',
      'Practice more timed quizzes to improve speed.',
      'Review incorrect answers for conceptual clarity.'
    ]
  },
  {
    type: 'paragraph',
    content: 'Let me know if you’d like a detailed topic-wise breakdown!'
  }
];


export const studentChatDetails = {
    1: { id: 1, title: 'How did I perform in previous 4 English tests?', details: 'You scored 85, 88, 90, and 87 in your last 4 English tests.' },
    2: { id: 2, title: 'Analyse my weaknesses in Hindi grammar.', details: 'Common mistakes: verb conjugation, gender agreement.' },
    3: { id: 3, title: 'Overall performance in Mathematics tests', details: 'Average score: 78%. Strength: Algebra. Weakness: Geometry.' },
    4: { id: 4, title: 'What feedback do you have on my problem..', details: 'Try to show your work step by step for better feedback.' },
    5: { id: 5, title: 'How did I perform in previous 4 English tests?', details: 'Repeated query. See above.' }
};


export const students = [
  { id: 1, name: 'Aarav Nair', grade: '10', section: 'A' },
  { id: 2, name: 'Saanvi Das', grade: '10', section: 'A' },
  { id: 3, name: 'Ishaan Gupta', grade: '10', section: 'B' },
  { id: 4, name: 'Meera Menon', grade: '10', section: 'B' },
  { id: 5, name: 'Aditya Pillai', grade: '10', section: 'C' },
  { id: 6, name: 'Riya Sharma', grade: '10', section: 'C' },
  { id: 7, name: 'Krishna Reddy', grade: '10', section: 'D' },
  { id: 8, name: 'Ananya Iyer', grade: '10', section: 'D' },
  { id: 9, name: 'Varun Chopra', grade: '10', section: 'E' },
  { id: 10, name: 'Diya Bansal', grade: '10', section: 'E' },
  { id: 11, name: 'Karan Verma', grade: '10', section: 'F' },
  { id: 12, name: 'Aditi Jain', grade: '10', section: 'F' },
  { id: 13, name: 'Mohmd Jaleel AbdulKhader', grade: '10', section: 'F' },
  { id: 14, name: 'Rohan Singh', grade: '10', section: 'G' },
  { id: 15, name: 'Neha Kulkarni', grade: '10', section: 'G' },
  { id: 16, name: 'Aryan Mishra', grade: '10', section: 'G' },
  { id: 17, name: 'Sneha Patil', grade: '10', section: 'G' },
  { id: 18, name: 'Vikram Rao', grade: '10', section: 'G' },
  { id: 19, name: 'Pooja Thakur', grade: '10', section: 'G' },
  { id: 20, name: 'Rajesh Kumar', grade: '10', section: 'G' },
  { id: 21, name: 'Priya Joshi', grade: '10', section: 'G' },
  { id: 22, name: 'Aakash Yadav', grade: '10', section: 'G' },
  { id: 23, name: 'Prakash Yadav', grade: '10', section: 'F' },
  { id: 24, name: 'Savakash Yadav', grade: '10', section: 'F' },
  { id: 25, name: 'Nikita Mehta', grade: '10', section: 'H' },
  { id: 26, name: 'Harsh Vardhan', grade: '10', section: 'H' },
  { id: 27, name: 'Siddharth Das', grade: '10', section: 'I' },
  { id: 28, name: 'Kriti Ghosh', grade: '10', section: 'I' },
  { id: 29, name: 'Tanya Roy', grade: '10', section: 'J' },
  { id: 30, name: 'Arjun Banerjee', grade: '10', section: 'J' }
];

export const teachers = [
  { id: 1, name: 'Mrs. Kavya Reddy', subject: 'English' },
  { id: 2, name: 'Mr. Sandeep Kumar', subject: 'Mathematics' },
  { id: 3, name: 'Ms. Jance Joseph', subject: 'Science' },
  { id: 4, name: 'Mr. Rajeev Menon', subject: 'Social Science' },
  { id: 5, name: 'Mrs. Priya Sharma', subject: 'Hindi' },
  { id: 6, name: 'Mr. Arvind Rao', subject: 'Computer Science' },
  { id: 7, name: 'Ms. Pooja Thakur', subject: 'Biology' },
  { id: 8, name: 'Mr. Vikram Singh', subject: 'Physics' },
  { id: 9, name: 'Mrs. Neha Kulkarni', subject: 'Chemistry' },
  { id: 10, name: 'Ms. Ananya Iyer', subject: 'English' }
];