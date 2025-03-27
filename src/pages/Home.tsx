import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { useHistory } from "react-router";
import { useCallback } from "react";
import ListTraining from "../components/listTraining/listTraining";

const Home: React.FC = () => {
    const history = useHistory();
    const navigateToCreateTraining = useCallback((route: string) => {
        history.push(route);
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>GymTracker</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ListTraining />
                <IonButton
                    expand="block"
                    onClick={() => navigateToCreateTraining('/createTraining')}
                    className="navigate-button"
                >
                    Criar treino
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Home;
