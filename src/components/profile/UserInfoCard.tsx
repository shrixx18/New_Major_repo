
import { useAuth } from '@/contexts/AuthProvider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const UserInfoCard = () => {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          {user?.user_metadata?.full_name && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{user.user_metadata.full_name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
