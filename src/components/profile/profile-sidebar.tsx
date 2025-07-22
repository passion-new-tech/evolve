import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface User {
  name: string;
  title: string;
  avatar: string;
  friends: number;
  education: string;
  location: string;
  skills: string;
  notes: string;
  // followers: number;
  // following: number;
}

const ProfileSidebar = ({ user }: { user: User }) => (
  <div className="w-full md:w-80 flex-shrink-0">
    <Card className="mb-4">
      <CardContent className="flex flex-col items-center py-6">
        <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full mb-2 border-4 border-primary object-cover" />
        <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
        <p className="text-muted-foreground text-sm mb-4">{user.title}</p>
        <div className="w-full flex flex-col gap-2 text-center">
          
            
        </div>
        <Button className="w-full mt-4" variantClassName="primary">Follow</Button>
      </CardContent>
    </Card>
    
  </div>
);

export default ProfileSidebar; 