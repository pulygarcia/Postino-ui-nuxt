import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast();

type RegisterValues = {
  userName: string;
  password: string;
  repeatPassword: string
};

type LoginValues = {
  userName: string;
  password: string;
};

export const useAuth = () => {

    const user = ref(null);

    onMounted(async () => {
      const token = localStorage.getItem('auth_jwt');

      if (token) {
          try {
              const response = await fetch('http://localhost:4000/api/auth/user', {
                  method: 'GET',
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              const data = await response.json();
              user.value = data.userName;
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      }
    })


    const register = async (valuesToSend:RegisterValues) => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(valuesToSend)
            });
    
            const data = await response.json();
    
            //send to the catch in order to show an error toast
            if (!response.ok) {
              throw new Error(data.msg);
            }
    
            toast({
              title: 'Success',
              description: data.msg,
            });
    
        }catch (error:any) {
            toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive'
            });
        }
    }


    const login = async (values:LoginValues) => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values)
            });
    
            const data = await response.json();
    
            //send to the catch in order to show an error toast
            if (!response.ok) {
              throw new Error(data.msg);
            }

            //console.log(values);
    
            toast({
              title: 'Success',
              description: 'Welcome ' + values.userName
            });
    
            localStorage.setItem('auth_jwt', data.jwt);

            navigateTo('/cashier')
    
    
          } catch (error:any) {
            toast({
              title: 'Error',
              description: error.message,
              variant: 'destructive'
            });
          }
    }

    const logOut = () => {
      if(confirm('User session will be closed')){
        localStorage.removeItem('auth_jwt');

        user.value = null;

        navigateTo('/login');
      }
    }

    
    return{
        register,
        login,
        user,
        logOut
    }
}