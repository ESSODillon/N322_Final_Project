import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, } from '@ionic/react';
import Card from '../components/ContactCards';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contacts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Card />
      </IonContent>
    </IonPage>
  );
};

export default Home;
