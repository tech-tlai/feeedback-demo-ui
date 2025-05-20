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
