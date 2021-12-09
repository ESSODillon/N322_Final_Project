import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonFab, IonFabButton, IonAlert } from '@ionic/react';
import {useState, useEffect} from "react";
import './ContactCards.css';
import { person, add, pencil, trash } from 'ionicons/icons';


interface ContainerProps { }

const Card: React.FC<ContainerProps> = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState({id: 90, name: "", phone: ""});
  const [addAlert, setAddAlert] = useState(false);
  const [editAlert, setEditAlert] = useState(false);

  useEffect(() => {
    fetch("data/contacts.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
      });
  }, []);

  const people = contacts.map((item, key) => (
    <IonCard>
        <IonCardHeader>
          <IonIcon icon={person} className="person_icon"/>

          <IonCardTitle>{item.name}</IonCardTitle>
          <IonCardSubtitle>{item.phone}</IonCardSubtitle>
        </IonCardHeader>
        
        <IonFabButton onClick={() => {setSelectedContact(item); setEditAlert(true);}} color={"light"} className={"pencil"} >
          <IonIcon color={"success"} icon={pencil} />
        </IonFabButton>

        <IonFabButton onClick={() => removeContact(key)} color={"light"} className={"trash"} >
          <IonIcon color={"danger"} icon={trash} />
        </IonFabButton>

      </IonCard>

      
  ));
  
  return (
    <div className="container">

      <br />

      <IonFab horizontal="start" slot="fixed">
        <IonFabButton onClick={() => setAddAlert(true)} color={"warning"}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <br />
      <br />
      <br />
      <br />

      {people}

      <IonAlert
        isOpen={addAlert}
        onDidDismiss={() => setAddAlert(false)}
        cssClass="add_contact"
        header={'Add Contact'}
        inputs={[
          {
            name: 'name',
            type: 'text',
            placeholder: 'Name',
          },
          {
            name: 'phone',
            type: 'text',
            placeholder: 'Phone Number',
          },
        ]}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Ok',
            handler: (data) => {
              contacts.push(data)
            },
          },
        ]}
      />

      <IonAlert
          isOpen={editAlert}
          onDidDismiss={() => setEditAlert(false)}
          cssClass="add_contact"
          header={'Edit Contact'}
          inputs={[
            {
                name: 'name',
                type: 'text',
                placeholder: selectedContact.name,
            },
            {
                name: 'phone',
                type: 'text',
                placeholder: selectedContact.phone,
            },
            ]}
            buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
            },
            {
              text: 'Ok',
              handler: (data) => {

              const newList = contacts.map((person, i) => {
                  if (i !== selectedContact.id) return person;
                  return {
                    id: selectedContact.id,
                    name: data.name,
                    phone: data.phone,
                  };
              });
              
              setContacts(newList);
            },
            }]} 
      />
    </div>
  );

  function removeContact(id: number) {

    const newList = contacts.filter((person, i) => {
      if (i !== id) {
        return person
      }
    });

    setContacts(newList);
  }
};
export default Card;
