<script>
  import FileUpload from './FileUpload.svelte'
  import { Trophy, TrendingUp, Target } from 'lucide-svelte'
</script>

<FileUpload 
  title="Student Results Upload"
  description="Upload exam results, assignment scores, and academic performance data for comprehensive analysis"
  placeholderImage="/placeholder.svg?height=120&width=120&query=students taking exam in classroom"
  uploadText="Upload student exam results"
  dragText="or drag and drop result files"
  fileTypes=".csv,.xlsx,.xls,.pdf"
  fileTypesDisplay="CSV, Excel, PDF"
  maxSize="50MB"
  features={[
    {
      icon: Trophy,
      title: "Grade Analysis",
      description: "Detailed breakdown of student performance across subjects and assessment types.",
      color: "graph-green"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor individual and class-wide improvement trends over time.",
      color: "graph-blue"
    },
    {
      icon: Target,
      title: "Learning Gaps",
      description: "Identify areas where students need additional support and intervention.",
      color: "graph-purple"
    }
  ]}
/>
