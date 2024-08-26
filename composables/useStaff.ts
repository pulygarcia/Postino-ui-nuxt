import { ref, computed, onMounted } from 'vue';
import {useToast} from '../components/ui/toast/use-toast.js'

interface Member {
  name: string;
  charge: string;
  salary: number;
  phoneNumber: string;
  adress: string;
  active: boolean;
  _id: string;
}

export const useStaff = () => {
  const members = ref<Member[]>([]);
  const searchInput = ref<string>('');
  const loading = ref<boolean>(false);

  const {toast} = useToast();

  onMounted(async () => {
    loading.value = true;
    try {
      const response = await fetch('http://localhost:4000/api/staff', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      members.value = data.members;
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally{
      loading.value = false;
    }
  });

  const filteredMembers = computed(() => {
    return members.value.filter(member => {
      const matchesSearch = !searchInput.value || member.name.toLowerCase().includes(searchInput.value.toLowerCase());
      return matchesSearch;
    });
  });


  const addMember = async (memberData:Member) => {
    try {
      await fetch('http://localhost:4000/api/staff', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(memberData)
      });

      toast({
        title: 'Member added',
        description: 'Member has been saved in database',
      });

      //refresh list visually
      await refreshList();

    } catch (error:any) {
        toast({
          title: 'Error adding member',
          description: error,
          variant: 'destructive'
        });
      }
  }

  const getMemberById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/staff/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const member = await response.json();
      return member;
    } catch (error) {
      console.error('Error fetching member:', error);
    }
  }


  const modifyMember = async (id:string, values:Member) => {
    try {
      await fetch(`http://localhost:4000/api/staff/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      toast({
        title: 'Member updated',
        description: 'Member data has been modified',
      });

      //refresh list visually
      //TODO: find why refresh by this way does not work
      await refreshList();

    } catch (error) {
      console.error('Error removing member:', error);
    }
  }
  

  const deleteMember = async (id:string) => {
    if(confirm('The member will be permanently deleted')){
      try {
        await fetch(`http://localhost:4000/api/staff/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        //refresh list visually
        await refreshList();

      } catch (error) {
        console.error('Error removing member:', error);
      }
    }
  }

  const refreshList = async () => {
    const response = await fetch(`http://localhost:4000/api/staff`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const refresh = await response.json()
    members.value = refresh.members;
  }

  return {
    members,
    searchInput,
    filteredMembers,
    addMember,
    getMemberById,
    modifyMember,
    loading,
    deleteMember
  };
};