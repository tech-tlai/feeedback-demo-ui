// src/routes/apis/teacher/chartData/+server.js
const section_wise_data ={
  "testCount": 1,
  "sectionData": [
    {
      "sectionId": 1,
      "scores": [
        {
          "scoreRangeId": 1,
          "studentProportion": 0,
          "scoreRange": "0-35%"
        },
        {
          "scoreRangeId": 2,
          "studentProportion": 0,
          "scoreRange": "36-50%"
        },
        {
          "scoreRangeId": 3,
          "studentProportion": 27,
          "scoreRange": "51-75%"
        },
        {
          "scoreRangeId": 4,
          "studentProportion": 73,
          "scoreRange": "76-100%"
        }
      ],
      "section": "7A"
    },
    {
      "sectionId": 2,
      "scores": [
        {
          "scoreRangeId": 1,
          "studentProportion": 0,
          "scoreRange": "0-35%"
        },
        {
          "scoreRangeId": 2,
          "studentProportion": 0,
          "scoreRange": "36-50%"
        },
        {
          "scoreRangeId": 3,
          "studentProportion": 67,
          "scoreRange": "51-75%"
        },
        {
          "scoreRangeId": 4,
          "studentProportion": 33,
          "scoreRange": "76-100%"
        }
      ],
      "section": "7B"
    },
    {
      "sectionId": 3,
      "scores": [
        {
          "scoreRangeId": 1,
          "studentProportion": 0,
          "scoreRange": "0-35%"
        },
        {
          "scoreRangeId": 2,
          "studentProportion": 0,
          "scoreRange": "36-50%"
        },
        {
          "scoreRangeId": 3,
          "studentProportion": 67,
          "scoreRange": "51-75%"
        },
        {
          "scoreRangeId": 4,
          "studentProportion": 33,
          "scoreRange": "76-100%"
        }
      ],
      "section": "7C"
    }
  ],
  "subject": "English",
  "scoreRanges": [
    {
      "id": 1,
      "name": "0-35%"
    },
    {
      "id": 2,
      "name": "36-50%"
    },
    {
      "id": 3,
      "name": "51-75%"
    },
    {
      "id": 4,
      "name": "76-100%"
    }
  ],
  "sections": [
    {
      "id": 1,
      "name": "7A"
    },
    {
      "id": 2,
      "name": "7B"
    },
    {
      "id": 3,
      "name": "7C"
    }
  ]
}


const perf_trend=[
  {
    "date": "6/10/24",
    "subject": "English",
    "examId": "ENG07101A",
    "marksPercentage": 76,
    "marks": 23,
    "totalMarks": 30,
    "subjectId": "ENG"
  },
  {
    "date": "7/10/24",
    "subject": "English",
    "examId": "ENG07102A",
    "marksPercentage": 76,
    "marks": 23,
    "totalMarks": 30,
    "subjectId": "ENG"
  },
  {
    "date": "8/10/24",
    "subject": "English",
    "examId": "ENG07103A",
    "marksPercentage": 82,
    "marks": 24,
    "totalMarks": 30,
    "subjectId": "ENG"
  }
]
const chartData={
  "all_classes_summary": [
    {
      "className": "Class 7 A",
      "studentCount": 15,
      "subjects": [
        {
          "subject": "English",
          "score": 77.63
        }
      ]
    },
    {
      "className": "Class 8 A",
      "studentCount": 15,
      "subjects": [
        {
          "subject": "English",
          "score": 73.41
        }
      ]
    }
  ],
  "perf_trend":perf_trend,
  "section_wise_data":section_wise_data,
  "performance_summary": {
    "Class": "7A",
    "studentCount": 15,
    "Subject": "English",
    "perfIndicators": [
      {
        "label": "Avg. Score",
        "value": 77.63,
        "period": "Last 3 tests"
      },
      {
        "label": "Pass Percentage",
        "value": 100.0,
        "period": "Latest Test"
      }
    ]
  },
  "topic_analysis": {
    "strong_topics": [
      {
        "name": "A Bicycle in Good Repair (Prose 9) - Plot Element - Climax Identification",
        "accuracy": 86.67
      },
      {
        "name": "A Bicycle in Good Repair (Prose 9) - Plot Element - Setting of Problem",
        "accuracy": 86.67
      },
      {
        "name": "A Bicycle in Good Repair (Prose 9) - Theme - Self-Reliance vs. Dependence",
        "accuracy": 86.67
      },
      {
        "name": "A Gift of Chappals (Prose) - Social Commentary - Critique of Materialism",
        "accuracy": 86.67
      },
      {
        "name": "Chivvy (Poem 4) - Poetic Device - Alliteration",
        "accuracy": 93.33
      }
    ],
    "challenging_topics": [
      {
        "name": "The Ashes that Made Trees Bloom (Prose 4) - Theme - Triumph of Good over Evil",
        "accuracy": 46.67
      },
      {
        "name": "The Invention of Vita-Wonk (Prose 7) - Vocabulary - Meaning of “elixir”",
        "accuracy": 46.67
      }
    ]
  },
  "learning_outcomes": [
    {
      "label": "Knowledge",
      "value": 76.99
    },
    {
      "label": "Application",
      "value": 77.56
    },
    {
      "label": "Understanding",
      "value": 78.39
    }
  ],
  "top_performers": [
    {
      "marksObtained": 27,
      "total": 30,
      "percentage": 90.0,
      "name": "Kavya Menon",
      "rank": 1
    },
    {
      "marksObtained": 27,
      "total": 30,
      "percentage": 90.0,
      "name": "Rachel Thomas",
      "rank": 1
    },
    {
      "marksObtained": 27,
      "total": 30,
      "percentage": 90.0,
      "name": "Tanvi Gupta",
      "rank": 1
    },
    {
      "marksObtained": 27,
      "total": 30,
      "percentage": 90.0,
      "name": "Arjun Deshmukh",
      "rank": 1
    },
    {
      "marksObtained": 27,
      "total": 30,
      "percentage": 90.0,
      "name": "Aaliyah Khan",
      "rank": 1
    }
  ],
  "students_at_risk": [
    {
      "marksObtained": 7,
      "total": 20,
      "percentage": 35.0,
      "name": "Jane Doe",
      "rank": 23
    }
  ],
  "average_max_min": {
    "testCount": 3,
    "subject": "English",
    "scoreTypes": [
      "Avg",
      "Max",
      "Min"
    ],
    "testScores": [
      {
        "avg": 82,
        "min": 63,
        "max": 90,
        "examId": "ENG07103A",
        "dateOfExam": "2024-08-10"
      },
      {
        "avg": 76,
        "min": 63,
        "max": 90,
        "examId": "ENG07102A",
        "dateOfExam": "2024-07-10"
      },
      {
        "avg": 76,
        "min": 60,
        "max": 90,
        "examId": "ENG07101A",
        "dateOfExam": "2024-06-10"
      }
    ]
  },
  "llm_performance_analysis": {
    "achievement": {
      "feedback": [
        {
          "id": 1,
          "text": "The class achieved an impressive average score of 77.63 over the last three tests, indicating a solid overall understanding of the subject."
        },
        {
          "id": 2,
          "text": "All students passed the latest test, showcasing effective teaching and learning strategies."
        },
        {
          "id": 3,
          "text": "Strong performance in multiple topics, particularly in plot elements and poetic devices, with accuracies above 86%."
        },
        {
          "id": 4,
          "text": "Top performers demonstrate high levels of understanding and application, with multiple students achieving 90%."
        }
      ]
    },
    "roomForImprovement": {
      "feedback": [
        {
          "id": 1,
          "text": "Students struggled significantly with themes and vocabulary in specific topics, particularly 'The Ashes that Made Trees Bloom' and 'The Invention of Vita-Wonk', with accuracies around 46%."
        },
        {
          "id": 2,
          "text": "There is a noticeable gap in understanding complex themes, which may require targeted interventions."
        }
      ]
    },
    "suggestions": {
      "feedback": [
        {
          "id": 1,
          "text": "Implement focused vocabulary sessions to enhance understanding of challenging words and concepts, especially those identified in the struggling topics."
        },
        {
          "id": 2,
          "text": "Utilize group discussions and projects on the themes of the challenging topics to encourage deeper engagement and comprehension."
        },
        {
          "id": 3,
          "text": "Incorporate formative assessments to gauge understanding of difficult concepts before formal testing."
        },
        {
          "id": 4,
          "text": "Provide additional resources or reading materials that align with the challenging topics to reinforce learning outside of classroom hours."
        }
      ]
    }
  }
}

import { json } from '@sveltejs/kit';



export async function GET({ url }) {
    // Parse query params
    const className = url.searchParams.get('class');
    const division = url.searchParams.get('division');
    const subject = url.searchParams.get('sub');

    // Find matching data set
    // const found = chartDataSet.find(
    //   d => d.key.className === className && d.key.division === division && d.key.subject === subject
    // );
  
    return json(chartData);
}
