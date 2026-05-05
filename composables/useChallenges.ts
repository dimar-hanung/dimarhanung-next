interface ChallengeItem {
  title: string;
  path: string;
  icon?: string[];
}

interface ChallengeGroup {
  key: string;
  label: string;
  icon: string[];
  collapsed: boolean;
  items: ChallengeItem[];
}

const frontendMentorItems: ChallengeItem[] = [
  {
    title: "QR Code",
    path: "/challenges/frontend-mentor/qrcode",
    icon: ["fa", "qrcode"],
  },
  {
    title: "Order Summary",
    path: "/challenges/frontend-mentor/order-summary",
    icon: ["fa", "credit-card"],
  },
  {
    title: "Single Page Developer Portofolio",
    path: "/challenges/frontend-mentor/3-single-page-developer-portofolio",
    icon: ["fa", "photo-video"],
  },
  {
    title: "Result Summary Component",
    path: "/challenges/frontend-mentor/4-result-summary-component",
    icon: ["fa", "pencil-square"],
  },
  {
    title: "Password Generator App",
    path: "/challenges/frontend-mentor/5-password-generator-app",
  },
  {
    title: "Product Preview Card Component",
    path: "/challenges/frontend-mentor/6-product-preview-card-component",
  },
  {
    title: "NFT Preview Card Component",
    path: "/challenges/frontend-mentor/7-nft-preview-card-component",
  },
  {
    title: "Tic Tac Toe Game",
    path: "/challenges/frontend-mentor/8-tic-tac-toe-game",
  },
  {
    title: "Stats Preview Card Component",
    path: "/challenges/frontend-mentor/9-stats-preview-card-component",
  },
  {
    title: "FAQ Accordion Card",
    path: "/challenges/frontend-mentor/10-faq-accordion-card",
  },
  {
    title: "Fylo Data Storage Component",
    path: "/challenges/frontend-mentor/11-fylo-data-storage-component",
  },
  {
    title: "3 Column Preview Card Component",
    path: "/challenges/frontend-mentor/12-3-column-preview-card-component",
  },
  {
    title: "Interactive card details form",
    path: "/challenges/frontend-mentor/13-interactive-card-details-form",
  },
];

const randomItems: ChallengeItem[] = [
  {
    title: "Gallery",
    path: "/challenges/random/01-gallery",
    icon: ["fa", "images"],
  },
];

export const useChallenges = () => {
  const route = useRoute();
  const router = useRouter();

  const challengeGroups = useState<ChallengeGroup[]>("challenge-groups", () => [
    {
      key: "frontend-mentor",
      label: "Frontend Mentor",
      icon: ["fa", "code"],
      collapsed: false,
      items: frontendMentorItems,
    },
    {
      key: "random",
      label: "Random",
      icon: ["fa", "dice"],
      collapsed: false,
      items: randomItems,
    },
  ]);

  const allChallenges = computed(() =>
    challengeGroups.value.flatMap((g) => g.items)
  );

  const currentChallengeIndex = computed(() =>
    allChallenges.value.findIndex((c) => c.path === route.path)
  );

  const navigateChallenge = (direction: "prev" | "next") => {
    const idx = currentChallengeIndex.value;
    const list = allChallenges.value;
    if (direction === "prev" && idx > 0) {
      router.push({ path: list[idx - 1].path, query: { ...route.query } });
    }
    if (direction === "next" && idx < list.length - 1) {
      router.push({ path: list[idx + 1].path, query: { ...route.query } });
    }
  };

  const toggleGroup = (key: string) => {
    const group = challengeGroups.value.find((g) => g.key === key);
    if (group) {
      group.collapsed = !group.collapsed;
    }
  };

  return {
    challengeGroups,
    allChallenges,
    currentChallengeIndex,
    navigateChallenge,
    toggleGroup,
  };
};