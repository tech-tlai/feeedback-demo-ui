// place files you want to import through the `$lib` alias in this folder.
// Follow the same order as in the file structure ( Alphabetical order of the file names)

// lib


//lib/components
import Card from '$lib/components/Card.svelte';
import Button from '$lib/components/Button.svelte';
import Datatable from '$lib/components/Datatable.svelte';
import FilterDropdown from '$lib/components/FilterDropdown.svelte';
import LegacyDatatable from '$lib/components/LegacyDatatable.svelte';
import LegacyTabs from '$lib/components/LegacyTabs.svelte';
import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';
import SearchBar from '$lib/components/SearchBar.svelte';
import SectionTitle from '$lib/components/SectionTitle.svelte';
import StrengthWeaknessNotfn from '$lib/components/StrengthWeaknessNotfn.svelte';
import Tabs from '$lib/components/Tabs.svelte';
export {
    Card,
    Button,
    Datatable,
    FilterDropdown,
    LegacyDatatable,
    LegacyTabs,
    ProgressIndicator,
    SearchBar,
    SectionTitle,
    StrengthWeaknessNotfn,
    Tabs
  };
  
// ========================================================================

//lib/components/charts
import DrilldownChart from '$lib/components/charts/DrilldownChart.svelte';
import Histogram from '$lib/components/charts/Histogram.svelte';
import PackedBubbleChart from '$lib/components/charts/PackedBubbleChart.svelte';

export {
    Histogram,
    PackedBubbleChart,
    DrilldownChart
  };

// =========================================================================   

//lib/components/loadingSkeletons

import SkelClassSummary from '$lib/components/loadingSkeletons/SkelClassSummary.svelte';
import SkelDataTable from '$lib/components/loadingSkeletons/SkelDataTable.svelte';

export {
  SkelClassSummary,
  SkelDataTable 
}
// =========================================================================   

//lib/components/teacher
import TeacherProfileSection from '$lib/components/teacher/TeacherProfileSection.svelte';
import TopicWiseAnalysisSection from '$lib/components/teacher/TopicWiseAnalysisSection.svelte';

export { TeacherProfileSection, TopicWiseAnalysisSection,}

// ================================================================================

//lib/components/teacher/charts
import AttendanceSheet from "$lib/components/teacher/charts/AttendanceSheet.svelte";
import AvgMaxMin from '$lib/components/teacher/charts/AvgMaxMin.svelte';
import LearningOutcome from '$lib/components/teacher/charts/LearningOutcome.svelte';
import OtherClassSummary from '$lib/components/teacher/charts/OtherClassSummary.svelte';
import PerformanceAnalysis from "$lib/components/teacher/charts/PerformanceAnalysis.svelte";
import PerformanceSummary from '$lib/components/teacher/charts/PerformanceSummary.svelte';
import SectionWiseScore from '$lib/components/teacher/charts/SectionWiseScore.svelte';
import StudentDistribution from '$lib/components/teacher/charts/StudentDistribution.svelte';
import StudentsAtRisk from "$lib/components/teacher/charts/StudentsAtRisk.svelte";
import SubjectPerfTrend from "$lib/components/teacher/charts/SubjectPerfTrend.svelte";
import TeacherPerfAnalysis from '$lib/components/teacher/charts/TeacherPerfAnalysis.svelte';
import TopPerformers from "$lib/components/teacher/charts/TopPerformers.svelte";
import TextualAnalysis from "$lib/components/teacher/charts/TextualAnalysis.svelte";
import TopicWiseAnalysis from "$lib/components/teacher/charts/TopicWiseAnalysis.svelte";
export {
    AttendanceSheet,
    AvgMaxMin,
    LearningOutcome,
    OtherClassSummary,
    PerformanceAnalysis,
    PerformanceSummary,
    SectionWiseScore,
    StudentDistribution,
    StudentsAtRisk,
    SubjectPerfTrend,
    TeacherPerfAnalysis,
    TopPerformers,
    TextualAnalysis,
    TopicWiseAnalysis,
  };


// ================================================================================

//lib/components/student
import PerfDummyCard from '$lib/components/student/PerfDummyCard.svelte';
import Badge from '$lib/components/student/Badge.svelte';

export { PerfDummyCard, Badge}

//lib/components/student/charts
import AllSubjectsProgressTrend from '$lib/components/student/charts/AllSubjectsProgressTrend.svelte';
import AllSubjectsPercentileTrend from '$lib/components/student/charts/AllSubjectsPercentileTrend.svelte';
import BadgesUnlocked from '$lib/components/student/charts/BadgesUnlocked.svelte';
import CurrentGoals from '$lib/components/student/charts/CurrentGoals.svelte';
import GoalsCard from '$lib/components/student/charts/GoalsCard.svelte';
import PercentileTrendChart from '$lib/components/student/charts/PercentileTrendChart.svelte';
import PerfHistoryCard from '$lib/components/student/charts/PerfHistoryCard.svelte';
import PerformanceTable from '$lib/components/student/charts/PerformanceTable.svelte';
import ProgressTrendChart from '$lib/components/student/charts/ProgressTrendChart.svelte';
import StudentPerfAnalysis from '$lib/components/student/charts/StudentPerfAnalysis.svelte';
import Quote from '$lib/components/student/charts/Quote.svelte';

export {
  AllSubjectsProgressTrend,
  AllSubjectsPercentileTrend,
  BadgesUnlocked, 
  CurrentGoals, 
  GoalsCard, 
  PercentileTrendChart,
  PerfHistoryCard,
  PerformanceTable,
  ProgressTrendChart,
  Quote,
  StudentPerfAnalysis
}
// ================================================================================



