import { IonItem } from "@ionic/react";

const ListTraining = () => {
    return (
        <IonItem>
            <div className="p-4">
                {(() => {
                    const trainings = JSON.parse(localStorage.getItem('trainings') || '[]');
                    return trainings.length > 0 ? (
            <div className="space-y-4">
                {trainings.map((training: any, index: number) => (
                    <div 
                        key={index}
                        className="border rounded-lg p-4 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold">
                            {training.trainingName}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {new Date().toLocaleDateString()}
                        </p>
                            </div>
                        ))}
                    </div>
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            Nenhum treino cadastrado ainda
                        </div>
                    )
                })()}   
            </div>
        </IonItem>
    );
};

export default ListTraining;