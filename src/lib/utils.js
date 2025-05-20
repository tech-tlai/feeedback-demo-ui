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