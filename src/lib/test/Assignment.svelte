<script>
  import FileUpload from './FileUpload.svelte'
  import { FileText, Clock, CheckSquare } from 'lucide-svelte'
</script>

<FileUpload 
  title="Assignment Submission Upload"
  description="Upload assignment submissions, project files, and coursework for automated grading and feedback"
  placeholderImage="/placeholder.svg?height=120&width=120&query=stack of assignment papers and documents"
  uploadText="Upload assignment files"
  dragText="or drag and drop submissions"
  fileTypes=".pdf,.docx,.txt,.zip,.jpg,.png"
  fileTypesDisplay="PDF, Word, Images, ZIP"
  maxSize="200MB"
  features={[
    {
      icon: FileText,
      title: "Auto-Grading",
      description: "Intelligent grading system that provides consistent and fair assessment.",
      color: "graph-green"
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Rapid processing and feedback generation to keep students engaged.",
      color: "graph-blue"
    },
    {
      icon: CheckSquare,
      title: "Plagiarism Check",
      description: "Built-in plagiarism detection to ensure academic integrity.",
      color: "graph-purple"
    }
  ]}
/>
