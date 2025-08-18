<script>
  import FileUpload from './FileUpload.svelte'
  import { GraduationCap, Users, BookOpen } from 'lucide-svelte'
</script>

<FileUpload 
  title="Teacher Performance Upload"
  description="Upload teacher evaluation data, classroom performance metrics, and professional development records"
  placeholderImage="/placeholder.svg?height=120&width=120&query=teacher with students in classroom"
  uploadText="Upload teacher evaluation files"
  dragText="or drag and drop evaluation documents"
  fileTypes=".csv,.xlsx,.xls,.pdf,.docx"
  fileTypesDisplay="CSV, Excel, PDF, Word"
  maxSize="100MB"
  features={[
    {
      icon: GraduationCap,
      title: "Performance Analytics",
      description: "Comprehensive analysis of teaching effectiveness and student engagement metrics.",
      color: "graph-green"
    },
    {
      icon: Users,
      title: "Peer Comparison",
      description: "Compare performance across departments and identify best practices for improvement.",
      color: "graph-blue"
    },
    {
      icon: BookOpen,
      title: "Development Insights",
      description: "Identify professional development opportunities based on performance data.",
      color: "graph-purple"
    }
  ]}
/>
