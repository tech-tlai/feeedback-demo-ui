/**
 * Constructs the student dashboard URL with query params.
 * @param {Object} params - { studentId, name, subject }
 * @returns {string} - The constructed URL
 */
export function getStudentDashboardUrl({ studentId, name, subject, studentClass, allSubjects }) {
    const base = `/student/dashboard/${encodeURIComponent(studentId)}`;
    const searchParams = [];
    if (studentId) searchParams.push(`id=${encodeURIComponent(studentId)}`);
    if (name) searchParams.push(`name=${encodeURIComponent(name)}`);
    if (studentClass) searchParams.push(`studentClass=${encodeURIComponent(studentClass)}`);
    if (subject) searchParams.push(`sub=${encodeURIComponent(subject)}`);
    if (Array.isArray(allSubjects) && allSubjects.length > 0) {
        const subjectsStr = allSubjects.map(s => encodeURIComponent(s)).join(',');
        searchParams.push(`subjects=${subjectsStr}`);
    }
    return searchParams.length ? `${base}?${searchParams.join('&&')}` : base;
}

export function getMarkColor(percentage,markThresholds) {
    if (percentage <= markThresholds.poor) return 'bg-red-light text-red-dark';
    if (percentage > markThresholds.poor && percentage <= markThresholds.average)
        return 'bg-orange-light text-orange-dark';
    if (percentage > markThresholds.average) return 'bg-green-light text-green-dark';
    return '';
}

export function transformForHistogram(data) {
  const scoreRanges = data.map(d => d.scoreRange); // ordered
  const sectionsSet = new Set();

  // First, collect all unique class names
  data.forEach(entry => {
    entry.scores.forEach(score => {
      sectionsSet.add(score.class);
    });
  });

  const sections = Array.from(sectionsSet).sort(); // e.g., ['3A', '3B', '3C', '3D']

  // Initialize an object to collect proportions per section
  const sectionDataMap = {};
  sections.forEach(section => {
    sectionDataMap[section] = [];
  });

  // Fill in data in order of scoreRanges
  data.forEach(entry => {
    const scoreMap = {};
    entry.scores.forEach(score => {
      scoreMap[score.class] = score.studentProportion;
    });

    sections.forEach(section => {
      sectionDataMap[section].push(scoreMap[section] || 0); // default 0 if not present
    });
  });

  // Convert sectionDataMap to an array of arrays for Chart.js
  const histogramData = sections.map(section => sectionDataMap[section]);

  return {
    scoreRanges,
    sections,
    histogramData
  };
}

export function clickOutside(node, callback) {
    const handleClick = (event) => {
      if (!node.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  export function formatDateDDMonthShortYear(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const yearShort = date.getFullYear().toString().slice(-2); 

  return `${day} ${month} '${yearShort}`;
}


/**
 * Generates a user-friendly error message based on HTTP status.
 * 
 * @param {Response | { status: number }} response - The fetch response or error object.
 * @param {'fetch' | 'create' | 'update' | 'delete'} action - The attempted action.
 * @param {string} entity - The name of the entity or module (e.g., "chat history").
 * @returns {string} A human-readable error message.
 */
export function getErrorMessage(response, action = 'fetch', entity = 'data') {
  const status = response?.status;

  switch (status) {
    case 400:
      return `Failed to ${action} ${entity}. Invalid request.`;
    case 401:
      return `Failed to ${action} ${entity}. You are unauthorized.`;
    case 403:
      return `Failed to ${action} ${entity}. Access is forbidden.`;
    case 404:
      return `Failed to ${action} ${entity}. Not found.`;
    case 409:
      return `Failed to ${action} ${entity}. Conflict occurred.`;
    case 422:
      return `Failed to ${action} ${entity}. Unprocessable data.`;
    case 429:
      return `Failed to ${action} ${entity}. Too many requests. Please try again later.`;
    case 500:
      return `Failed to ${action} ${entity}. Internal server error.`;
    case 502:
      return `Failed to ${action} ${entity}. Bad gateway.`;
    case 503:
      return `Failed to ${action} ${entity}. Service unavailable.`;
    case 504:
      return `Failed to ${action} ${entity}. Gateway timeout.`;
    default:
      return `Failed to ${action} ${entity}. Something went wrong.`;
  }
}


export function transformSectionWiseData(sectionWiseData) {
  const resultMap = new Map();

  // Loop through each section
  for (const section of sectionWiseData.sectionData) {
    const className = section.section;

    // Loop through each score in the section
    for (const score of section.scores) {
      const range = score.scoreRange;
      const proportion = score.studentProportion;

      // If the range is not yet in resultMap, initialize it
      if (!resultMap.has(range)) {
        resultMap.set(range, {
          scoreRange: range,
          scores: [],
        });
      }

      // Push the score for this class
      resultMap.get(range).scores.push({
        studentProportion: proportion,
        class: className,
      });
    }
  }

  // Convert Map to Array
  return Array.from(resultMap.values());
}


export function toHistogramArray(transformedData) {
  const classList = [];

  // Collect unique class names (in order of appearance)
  transformedData[0]?.scores?.forEach(score => {
    classList.push(score.class);
  });

  // Initialize a 2D array with one row per class
  const histogramData = classList.map(() => []);

  // Loop through each score range
  transformedData.forEach(entry => {
    entry.scores.forEach((score, index) => {
      histogramData[index].push(score.studentProportion);
    });
  });

  return histogramData;
}

