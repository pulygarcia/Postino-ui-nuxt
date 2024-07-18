import { ref, computed, onMounted } from 'vue';

interface Item {
  name: string;
  description: string;
  price: number;
  category: string;
  _id: string
}

export const useItems = () => {
  const items = ref<Item[]>([]);
  const searchInput = ref<string>('');
  const selectedCategory = ref<string>('');

  onMounted(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/menu', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      items.value = data.items;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  const filteredItems = computed(() => {
    return items.value.filter(item => {
      const matchesSearch = !searchInput.value || item.name.toLowerCase().includes(searchInput.value.toLowerCase());
      const matchesCategory = !selectedCategory.value || item.category.toLowerCase().includes(selectedCategory.value.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  });

  const uniqueCategories = computed(() => {
    const categories = items.value.map(item => item.category);
    return [...new Set(categories)];
  });

  return {
    items,
    searchInput,
    selectedCategory,
    filteredItems,
    uniqueCategories
  };
};