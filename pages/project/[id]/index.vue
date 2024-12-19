<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-8 dark:text-white"
  >
    <main
      class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
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
            <Calendar class="mr-2" />
            <span>Start Date: 2023-06-01</span>
          </div>
          <div class="flex items-center text-green-600">
            <Clock class="mr-2" />
            <span>Duration: 3 months</span>
          </div>
          <div class="flex items-center text-purple-600">
            <User class="mr-2" />
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
          <template v-if="!showFullDescription">
            <TButton
              @click="showFullDescription = true"
              variant="outline"
              class="mt-2"
            >
              Read More <ChevronDown class="ml-2" />
            </TButton>
          </template>
          <template v-else>
            <p class="text-gray-600 mb-4">
              Our team has leveraged cutting-edge technologies to build a
              scalable and performant application that can handle large datasets
              with ease. The user interface is designed with accessibility in
              mind, ensuring that users of all abilities can navigate and
              utilize the tool effectively.
            </p>
            <p class="text-gray-600 mb-4">
              Key features of the project include real-time data updates,
              customizable dashboards, advanced filtering options, and
              integration with popular data sources. We've also implemented
              machine learning algorithms to provide predictive insights, giving
              users a competitive edge in their decision-making processes.
            </p>
            <TButton
              @click="showFullDescription = false"
              variant="outline"
              class="mt-2"
            >
              Show Less <ChevronUp class="ml-2" />
            </TButton>
          </template>
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
          <input
            type="range"
            min="0"
            max="100"
            v-model="progress"
            class="w-full"
            @input="handleProgressChange"
          />
          <div
            class="h-4 rounded-full mt-2 transition-all duration-300 ease-in-out"
            :style="{
              width: `${progress}%`,
              backgroundColor: `hsl(${hue}, 100%, 50%)`,
            }"
          />
          <p class="text-center mt-2">{{ progress }}% Complete</p>
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
        <div class="mb-8">
          <div
            v-for="milestone in milestones"
            :key="milestone.date"
            class="flex items-center mb-4 dark:text-white"
          >
            <div class="bg-blue-500 rounded-full w-4 h-4 mr-4"></div>
            <div>
              <h3 class="font-semibold">{{ milestone.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-white">
                {{ milestone.date }}
              </p>
              <p class="text-sm">{{ milestone.description }}</p>
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
        <UAccordion type="single" collapsible class="mb-8">
          <UAccordionItem
            v-for="(faq, index) in faqs"
            :key="index"
            :value="'item-' + index"
          >
            <UAccordionTrigger>{{ faq.question }}</UAccordionTrigger>
            <UAccordionContent>{{ faq.answer }}</UAccordionContent>
          </UAccordionItem>
        </UAccordion>

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">
          Project Resources
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <TButton variant="outline" class="flex items-center justify-center">
            <Download class="mr-2" />
            Download Project Brief
          </TButton>
          <TButton variant="outline" class="flex items-center justify-center">
            <ExternalLink class="mr-2" />
            View Live Demo
          </TButton>
          <TButton variant="outline" class="flex items-center justify-center">
            <GitHub class="mr-2" />
            View Source Code
          </TButton>
          <TButton variant="outline" class="flex items-center justify-center">
            <Mail class="mr-2" />
            Contact Support
          </TButton>
        </div>

        <h2 class="text-2xl font-semibold mb-4 dark:text-white">
          Rate This Project
        </h2>
        <div class="flex items-center mb-8">
          <Star
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
            <Send class="mr-2" />
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
                <Twitter class="w-5 h-5" />
              </a>
              <a
                href="#"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Linkedin class="w-5 h-5" />
              </a>
              <a
                href="#"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <GitHub class="w-5 h-5" />
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
// import {
//   Calendar,
//   Clock,
//   User,
//   Mail,
//   Send,
//   ChevronDown,
//   ChevronUp,
//   Star,
//   Download,
//   ExternalLink,
//   GitlabIcon as GitHub,
//   Twitter,
//   Linkedin,
// } from "lucide-vue-next";

const activeImage = ref(0);
const progress = ref(0);
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

const handleProgressChange = (event) => {
  const value = parseInt(event.target.value);
  progress.value = value;
  hue.value = value * 3.6; // 0-360 hue range
};

const handleRating = (value) => {
  rating.value = value;
};

const handleSubmit = () => {
  // Implement form submission logic here
  console.log("Form submitted");
};
</script>
