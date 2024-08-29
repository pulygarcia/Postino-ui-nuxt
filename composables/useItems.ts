import { ref, computed, onMounted } from 'vue';
import {useToast} from '../components/ui/toast/use-toast.js'

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
  const loading = ref<boolean>(false);
  const {toast} = useToast();

  onMounted(async () => {
    loading.value = true;
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
    }finally{
      loading.value = false;
    }
  });

  const createItem = async (itemData:Item) => {
    try {
      await fetch('http://localhost:4000/api/menu', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData)
      });

      toast({
        title: 'Item added',
        description: 'Item has been saved in database',
      });
      
      //refresh list visually
      await refreshList(); //TODO: check why this is not working here

    } catch (error:any) {
        toast({
          title: 'Error adding item',
          description: error,
          variant: 'destructive'
        });
    }
  }

  const getItemById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/menu/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const item = await response.json();
      return item;
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  }

  const modifyItem = async (id:string, values:Item) => {
    try {
      await fetch(`http://localhost:4000/api/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      toast({
        title: 'Item updated',
        description: 'Item data has been modified',
      });

      //refresh list visually
      //TODO: find why refresh by this way does not work
      await refreshList();

    } catch (error) {
      console.error('Error removing member:', error);
    }
  }

  const removeItem = async (itemID:string) => {
    if(confirm('Item will be deleted permanently')){
      try {
        await fetch(`http://localhost:4000/api/menu/${itemID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        })
  
        toast({
          title: 'Item was removed from Menu',
          description: 'Item has been deleted correctly in database',
        });
  
        //refresh list visually
        await refreshList();
  
      } catch (error:any) {
          toast({
            title: 'Error removing item',
            description: error,
            variant: 'destructive'
          });
        }
    }
  }

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

  const refreshList = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/menu`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const refresh = await response.json();
      //console.log('Refreshed items:', refresh.items);
      items.value = refresh.items;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    items,
    searchInput,
    selectedCategory,
    uniqueCategories,
    createItem,
    getItemById,
    modifyItem,
    removeItem,
    filteredItems,
    loading
  };
};