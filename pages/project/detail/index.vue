<template>
  <TNav></TNav>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 dark:from-primary-900 dark:to-black p-8 dark:text-white"
  >
    <main
      class="max-w-4xl mx-auto bg-white dark:bg-muted-900 rounded-xl shadow-2xl overflow-hidden"
    >
      <div class="relative h-96">
        <img
          src="/home/project/srs.png"
          alt="Project Hero"
          class="object-cover w-full h-full"
        />
        <div
          class="absolute inset-0 bg-black/50 flex items-center justify-center"
        >
          <h1 class="text-5xl font-bold text-white text-center">
            Colorful Interactive Project
          </h1>
        </div>
      </div>

      <div class="p-8">
        <div class="flex flex-wrap gap-4 mb-8">
          <div class="flex items-center text-blue-600">
            <Icon name="mdi:calendar" class="mr-2" />
            <span>Start Date: 2023-06-01</span>
          </div>
          <div class="flex items-center text-green-600">
            <Icon name="mdi:clock" class="mr-2" />
            <span>Duration: 3 months</span>
          </div>
          <div class="flex items-center text-purple-600">
            <Icon name="mdi:user" class="mr-2" />
            <span>Team: 5 members</span>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-semibold mb-4 dark:text-white">
            Project Overview
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            This exciting project showcases various interactive elements and a
            vibrant design. We've incorporated animations, color transitions,
            and user interactions to create an engaging experience. The project
            aims to revolutionize how users interact with data visualization
            tools, providing an intuitive and aesthetically pleasing interface
            for complex data analysis.
          </p>

          <div v-if="showFullDescription" class="space-y-4">
            <p class="text-gray-600 dark:text-gray-300">
              Our team has leveraged cutting-edge technologies to build a
              scalable and performant application that can handle large datasets
              with ease. The user interface is designed with accessibility in
              mind, ensuring that users of all abilities can navigate and
              utilize the tool effectively.
            </p>
            <p class="text-gray-600 dark:text-gray-300">
              Key features of the project include real-time data updates,
              customizable dashboards, advanced filtering options, and
              integration with popular data sources. We've also implemented
              machine learning algorithms to provide predictive insights, giving
              users a competitive edge in their decision-making processes.
            </p>
          </div>

          <button
            @click="showFullDescription = !showFullDescription"
            class="mt-4 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {{ showFullDescription ? "Show Less" : "Read More" }}
            <Icon
              :name="
                showFullDescription ? 'mdi:chevron-up' : 'mdi:chevron-down'
              "
              class="ml-2"
            />
          </button>
        </div>

        <h2 class="text-2xl font-semibold mb-6 dark:text-white">
          Project Gallery
        </h2>
        <div class="mb-8">
          <!-- Featured main image -->
          <div
            class="relative h-96 mb-6 group overflow-hidden rounded-xl cursor-pointer"
            @click="
              openModal('/home/project/srs.png', 'Main Project Screenshot')
            "
          >
            <img
              src="/home/project/srs.png"
              alt="Main Project Screenshot"
              class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <!-- Click indicator -->
            <div
              class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div class="bg-white/20 backdrop-blur-xs rounded-full p-3">
                <Icon name="mdi:magnify-plus" class="text-white text-2xl" />
              </div>
            </div>
          </div>

          <!-- Image grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(image, index) in projectImages"
              :key="index"
              class="group relative overflow-hidden rounded-lg aspect-video bg-gray-100 dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              @click="openModal(image, 'Project Screenshot ' + (index + 1))"
            >
              <img
                :src="image"
                :alt="'Project Screenshot ' + (index + 1)"
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <p class="text-sm font-medium">View {{ index + 1 }}</p>
              </div>
              <!-- Click indicator -->
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div class="bg-white/20 backdrop-blur-xs rounded-full p-2">
                  <Icon name="mdi:magnify-plus" class="text-white text-xl" />
                </div>
              </div>
              <!-- Hover overlay with subtle animation -->
              <div
                class="absolute inset-0 ring-2 ring-blue-500/0 group-hover:ring-blue-500/50 transition-all duration-300 rounded-lg"
              ></div>
            </div>
          </div>
        </div>

        <ProjectProgress :progress="progress" />

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">Skills Used</h2>
        <div class="flex flex-wrap gap-2 mb-8">
          <div
            v-for="skill in skills"
            :key="skill"
            class="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full"
          >
            {{ skill }}
          </div>
        </div>

        <TeamMembers :team-members="teamMembers" />

        <ProjectTimeline :milestones="milestones" />

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">
          Project Details
        </h2>
        <TTabs default-value="features" class="mb-8">
          <TTabsList>
            <TTabsTrigger value="features">Features</TTabsTrigger>
            <TTabsTrigger value="technical">Technical Details</TTabsTrigger>
            <TTabsTrigger value="future">Future Plans</TTabsTrigger>
          </TTabsList>
          <TTabsContent value="features">
            <ul class="list-disc pl-5 space-y-2">
              <li>
                Real-time data visualization with interactive charts and graphs
              </li>
              <li>Customizable dashboards for personalized data views</li>
              <li>
                Advanced filtering and sorting options for in-depth analysis
              </li>
              <li>Collaborative features for team-based data exploration</li>
              <li>Export functionality for reports and presentations</li>
            </ul>
          </TTabsContent>
          <TTabsContent value="technical">
            <ul class="list-disc pl-5 space-y-2">
              <li>Built with Vue 3 and Nuxt 3 for optimal performance</li>
              <li>
                Utilizes GraphQL for efficient data fetching and management
              </li>
              <li>Implements WebSocket for real-time updates</li>
              <li>
                Leverages serverless functions for scalable backend operations
              </li>
              <li>Integrates with various data sources through custom APIs</li>
            </ul>
          </TTabsContent>
          <TTabsContent value="future">
            <ul class="list-disc pl-5 space-y-2">
              <li>
                Integration with machine learning models for predictive
                analytics
              </li>
              <li>Expansion of data source connectors</li>
              <li>Development of mobile applications for on-the-go access</li>
              <li>
                Implementation of natural language processing for data querying
              </li>
              <li>
                Enhanced collaboration features including real-time editing
              </li>
            </ul>
          </TTabsContent>
        </TTabs>

        <ClientTestimonials :testimonials="testimonials" />

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">
          Frequently Asked Questions
        </h2>
        <TAccordion type="single" collapsible class="mb-8">
          <TAccordionItem
            v-for="(faq, index) in faqs"
            :key="index"
            :value="'item-' + index"
          >
            <TAccordionTrigger>{{ faq.question }}</TAccordionTrigger>
            <TAccordionContent>{{ faq.answer }}</TAccordionContent>
          </TAccordionItem>
        </TAccordion>

        <ProjectResources @resource-click="handleResourceClick" />

        <ProjectFooter />
      </div>
    </main>
  </div>

  <!-- Image Modal -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs"
    @click="closeModal"
  >
    <div class="relative max-w-7xl max-h-[90vh] mx-4">
      <!-- Close button -->
      <button
        @click="closeModal"
        class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
      >
        <Icon name="mdi:close" class="text-3xl" />
      </button>

      <!-- Modal image -->
      <div class="relative overflow-hidden rounded-lg shadow-2xl">
        <img
          :src="modalImage"
          :alt="modalAlt"
          class="max-w-full max-h-[90vh] object-contain"
          @click.stop
        />

        <!-- Image title -->
        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
        >
          <h3 class="text-white text-lg font-semibold">{{ modalAlt }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import ProjectTimeline from "./components/ProjectTimeline.vue";
import TeamMembers from "./components/TeamMembers.vue";
import ProjectProgress from "./components/ProjectProgress.vue";
import ClientTestimonials from "./components/ClientTestimonials.vue";
import ProjectResources from "./components/ProjectResources.vue";
import ProjectFooter from "./components/ProjectFooter.vue";

const progress = ref(60);
const hue = ref(0);
const showFullDescription = ref(false);
const rating = ref(0);

// Modal state
const isModalOpen = ref(false);
const modalImage = ref("");
const modalAlt = ref("");

const projectImages = [
  "/placeholder.svg?height=400&width=600&text=Main+Image",
  "/placeholder.svg?height=400&width=600&text=Process+Diagram",
  "/placeholder.svg?height=400&width=600&text=Team+Photo",
  "/placeholder.svg?height=400&width=600&text=Results+Chart",
];

const skills = [
  "Vue 3",
  "Nuxt 3",
  "TypeScript",
  "Tailwind CSS",
  "UI/UX Design",
  "Responsive Web Design",
  "Performance Optimization",
];

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Project Lead",
    image: "/placeholder.svg?height=100&width=100&text=AJ",
  },
  {
    name: "Bob Smith",
    role: "Frontend Developer",
    image: "/placeholder.svg?height=100&width=100&text=BS",
  },
  {
    name: "Carol Williams",
    role: "Backend Developer",
    image: "/placeholder.svg?height=100&width=100&text=CW",
  },
  {
    name: "David Brown",
    role: "UI/UX Designer",
    image: "/placeholder.svg?height=100&width=100&text=DB",
  },
  {
    name: "Eva Martinez",
    role: "QA Engineer",
    image: "/placeholder.svg?height=100&width=100&text=EM",
  },
];

const milestones = [
  {
    date: "2023-06-01",
    title: "Project Kickoff",
    description: "Initial team meeting and project scope definition.",
  },
  {
    date: "2023-06-15",
    title: "Design Phase Complete",
    description: "Finalization of UI/UX designs and project architecture.",
  },
  {
    date: "2023-07-15",
    title: "MVP Development",
    description: "Completion of core features and minimum viable product.",
  },
  {
    date: "2023-08-01",
    title: "User Testing",
    description:
      "Conducting user tests and gathering feedback for improvements.",
  },
  {
    date: "2023-08-15",
    title: "Final Refinements",
    description: "Implementing user feedback and polishing the application.",
  },
  {
    date: "2023-09-01",
    title: "Project Launch",
    description: "Official release of the project to the public.",
  },
];

const testimonials = [
  {
    name: "John Doe",
    company: "Tech Innovators Inc.",
    content:
      "This project exceeded our expectations. The team's attention to detail and innovative approach set a new standard for our industry.",
  },
  {
    name: "Jane Smith",
    company: "Digital Solutions Co.",
    content:
      "Working with this team was a pleasure. Their technical expertise and commitment to quality delivered outstanding results.",
  },
  {
    name: "Mike Johnson",
    company: "Future Systems LLC",
    content:
      "The project's impact on our operations has been transformative. It's not just a product; it's a game-changer for our business.",
  },
];

const faqs = [
  {
    question: "What was the main challenge in this project?",
    answer:
      "The main challenge was integrating legacy systems with cutting-edge technologies while ensuring seamless user experience and maintaining high performance.",
  },
  {
    question: "How did you ensure the project's scalability?",
    answer:
      "We implemented a microservices architecture and used cloud-native technologies to ensure the project can easily scale to accommodate future growth and increased user load.",
  },
  {
    question: "What measures were taken for data security?",
    answer:
      "We employed industry-standard encryption protocols, implemented strict access controls, and conducted regular security audits to ensure the highest level of data protection.",
  },
  {
    question: "How did you approach the UI/UX design?",
    answer:
      "Our design process involved extensive user research, iterative prototyping, and usability testing to create an intuitive and visually appealing interface that meets user needs effectively.",
  },
  {
    question: "What sets this project apart from similar solutions?",
    answer:
      "This project stands out due to its innovative use of AI for predictive analytics, its highly customizable user interface, and its seamless integration capabilities with a wide range of third-party tools.",
  },
];

const getProgressColor = (value: number) => {
  if (value < 25) return "#ef4444"; // red
  if (value < 50) return "#f97316"; // orange
  if (value < 75) return "#eab308"; // yellow
  return "#22c55e"; // green
};

const getProgressColorEnd = (value: number) => {
  if (value < 25) return "#dc2626"; // darker red
  if (value < 50) return "#ea580c"; // darker orange
  if (value < 75) return "#ca8a04"; // darker yellow
  return "#16a34a"; // darker green
};

const handleResourceClick = (resource: any) => {
  console.log("Resource clicked:", resource);
  // Handle different resource actions here
  if (resource.action) {
    // Implement specific actions based on resource type
  }
};

const handleSubmit = () => {
  // Implement form submission logic here
  console.log("Form submitted");
};

// Modal functions
const openModal = (imageSrc: string, imageAlt: string) => {
  modalImage.value = imageSrc;
  modalAlt.value = imageAlt;
  isModalOpen.value = true;
  // Prevent body scroll when modal is open
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  isModalOpen.value = false;
  modalImage.value = "";
  modalAlt.value = "";
  // Restore body scroll
  document.body.style.overflow = "auto";
};

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isModalOpen.value) {
    closeModal();
  }
};

// Add and remove event listeners
onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  // Ensure body scroll is restored if component unmounts while modal is open
  document.body.style.overflow = "auto";
});
</script>
