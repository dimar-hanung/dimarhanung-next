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
          alt="Project Hero Image"
          class="object-cover w-full h-full"
        />
        <div
          class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
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
            {{ showFullDescription ? 'Show Less' : 'Read More' }}
            <Icon 
              :name="showFullDescription ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
              class="ml-2" 
            />
          </button>
        </div>

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">
          Project Gallery
        </h2>
        <div class="mb-8">
          <div class="relative h-80 mb-4">
            <img
              :src="'/home/project/srs.png'"
              :alt="'Project Image ' + (activeImage + 1)"
              class="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div class="flex justify-center gap-2">
            <button
              v-for="(_, index) in projectImages"
              :key="index"
              class="w-3 h-3 rounded-full"
              :class="index === activeImage ? 'bg-blue-600' : 'bg-gray-300'"
              @click="activeImage = index"
            />
          </div>
        </div>

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">
          Project Progress
        </h2>
        <div class="mb-8">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-600 dark:text-gray-400"
              >Progress</span
            >
            <span class="text-sm font-semibold text-gray-900 dark:text-white"
              >{{ progress }}%</span
            >
          </div>

          <!-- Progress bar with gradient -->
          <div
            class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
          >
            <div
              class="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              :style="{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${getProgressColor(
                  progress
                )}, ${getProgressColorEnd(progress)})`,
              }"
            >
              <!-- Shimmer effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"
              ></div>
            </div>
          </div>

          <!-- Progress milestones -->
          <div
            class="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400"
          >
            <span>Start</span>
            <span class="text-center">{{
              progress < 50
                ? "In Progress"
                : progress < 100
                ? "Nearly Done"
                : "Complete"
            }}</span>
            <span>Complete</span>
          </div>
        </div>

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

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">
          Team Members
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div
            v-for="member in teamMembers"
            :key="member.name"
            class="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 flex items-center space-x-4"
          >
            <img
              :src="'/home/project/srs.png'"
              :alt="member.name"
              class="w-12 h-12 rounded-full"
            />
            <div>
              <h3 class="font-semibold dark:text-white">{{ member.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-300">
                {{ member.role }}
              </p>
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">
          Project Milestones
        </h2>
        <div class="mb-8 relative">
          <!-- Timeline line -->
          <div
            class="absolute left-4 top-6 bottom-0 w-px bg-gray-200 dark:bg-gray-700"
          ></div>

          <div
            v-for="(milestone, index) in milestones"
            :key="milestone.date"
            class="relative flex items-start mb-4 last:mb-0"
          >
            <!-- Timeline dot -->
            <div class="relative z-10 flex-shrink-0 mr-4">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                :class="
                  index < 4
                    ? 'bg-green-500 text-white'
                    : index === 4
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                "
              >
                <Icon
                  :name="
                    index < 4
                      ? 'mdi:check'
                      : index === 4
                      ? 'mdi:play'
                      : 'mdi:circle-outline'
                  "
                  class="w-4 h-4"
                />
              </div>
            </div>

            <!-- Milestone content -->
            <div class="flex-1 min-h-[2rem] pb-2">
              <div class="flex items-center justify-between mb-1">
                <h3 class="font-semibold text-sm dark:text-white">
                  {{ milestone.title }}
                </h3>
                <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {{ milestone.date }}
                </span>
              </div>

              <p
                class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {{ milestone.description }}
              </p>
            </div>
          </div>
        </div>

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

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">
          Client Testimonials
        </h2>
        <div class="mb-8 space-y-4">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
          >
            <p class="italic mb-2 dark:text-white">
              "{{ testimonial.content }}"
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              - {{ testimonial.name }}, {{ testimonial.company }}
            </p>
          </div>
        </div>

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

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">
          Project Resources
        </h2>
        <div class="mb-8 border rounded-lg">
          <button
            class="flex items-center p-4 border-b w-full text-left transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-105 hover:shadow-md group"
          >
            <Icon
              name="mdi:download"
              class="w-6 h-6 mr-3 text-blue-800 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
            />
            <span
              class="font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300"
              >Download Project Brief</span
            >
          </button>
          <button
            class="flex items-center p-4 border-b w-full text-left transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:scale-105 hover:shadow-md group"
          >
            <Icon
              name="mdi:eye"
              class="w-6 h-6 mr-3 text-green-800 transition-transform duration-300 group-hover:scale-110 group-hover:pulse"
            />
            <span
              class="font-medium group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300"
              >View Live Demo</span
            >
          </button>
          <button
            class="flex items-center p-4 border-b w-full text-left transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-105 hover:shadow-md group"
          >
            <Icon
              name="mdi:code-json"
              class="w-6 h-6 mr-3 text-purple-800 transition-transform duration-300 group-hover:scale-110 group-hover:bounce"
            />
            <span
              class="font-medium group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300"
              >View Source Code</span
            >
          </button>
          <button
            class="flex items-center p-4 w-full text-left transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-105 hover:shadow-md group"
          >
            <Icon
              name="mdi:help-circle"
              class="w-6 h-6 mr-3 text-red-800 transition-transform duration-300 group-hover:scale-110 group-hover:wiggle"
            />
            <span
              class="font-medium group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-300"
              >Contact Support</span
            >
          </button>
        </div>

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">
          Rate This Project
        </h2>
        <div class="flex items-center mb-8">
          <Icon
            name="mdi:star"
            v-for="star in 5"
            :key="star"
            class="w-8 h-8 cursor-pointer"
            :class="
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            "
            @click="handleRating(star)"
          />
          <span class="ml-2 text-gray-600 dark:text-gray-300">
            {{
              rating > 0
                ? `You rated this project ${rating} stars`
                : "Click to rate"
            }}
          </span>
        </div>

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">Contact Us</h2>
        <form class="space-y-4 mb-8" @submit.prevent="handleSubmit">
          <UInput type="text" placeholder="Your Name" />
          <UInput type="email" placeholder="Your Email" />
          <UTextarea placeholder="Your Message" />
          <TButton type="submit" class="w-full">
            <Icon name="mdi:send" class="mr-2" />
            Send Message
          </TButton>
        </form>

        <footer class="border-t dark:border-gray-600 pt-8 mt-8">
          <div class="flex justify-between items-center">
            <p class="text-sm text-gray-600 dark:text-gray-300">
              © {{ new Date().getFullYear() }} Colorful Interactive Project. All
              rights reserved.
            </p>
            <div class="flex space-x-4">
              <a
                href="#"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Icon name="mdi:twitter" class="w-5 h-5" />
              </a>
              <a
                href="#"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Icon name="mdi:linkedin" class="w-5 h-5" />
              </a>
              <a
                href="#"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Icon name="mdi:github" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeImage = ref(0);
const progress = ref(60);
const hue = ref(0);
const showFullDescription = ref(false);
const rating = ref(0);

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

const handleRating = (value: number) => {
  rating.value = value;
};

const handleSubmit = () => {
  // Implement form submission logic here
  console.log("Form submitted");
};
</script>

<style scoped>
/* Shimmer animation */
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
