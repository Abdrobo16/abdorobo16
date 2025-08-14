import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Shield, TrendingUp, Users } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function Landing() {
  const { t } = useTranslation();
  
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-blue-700">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center text-white mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-10 p-4 rounded-full">
              <Store className="h-16 w-16" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6">{t('storeAccountManager')}</h1>
          <p className="text-xl mb-8 opacity-90">
            {t('landingDescription')}
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100"
            onClick={handleLogin}
            data-testid="button-login"
          >
            {t('getStarted')}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
            <CardContent className="p-6 text-center text-white">
              <Shield className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('secureAccess')}</h3>
              <p className="opacity-90">{t('secureAccessDesc')}</p>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
            <CardContent className="p-6 text-center text-white">
              <TrendingUp className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('realTimeTracking')}</h3>
              <p className="opacity-90">{t('realTimeTrackingDesc')}</p>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
            <CardContent className="p-6 text-center text-white">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('multiUserSupport')}</h3>
              <p className="opacity-90">{t('multiUserSupportDesc')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
