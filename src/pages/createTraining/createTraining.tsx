import {
    IonHeader,
    IonContent,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonButton,
    IonRange,
    IonTextarea,
    IonButtons,
    IonBackButton,
    getPlatforms,
} from "@ionic/react";
import { useForm, useWatch, Controller, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import { Keyboard } from '@capacitor/keyboard';
import "./createTraining.css";

// This should be outside the component (no hooks here)
const exerciseTypes = ["Superior", "Inferior", "Cardio"];

const handleFocus = (event: Event) => {
    const target = event.target as HTMLElement;
    const platforms = getPlatforms();
    const isAndroid = platforms.includes('android');
    
    setTimeout(() => {
        if (isAndroid) {
            // On Android, we need a longer delay and different scroll behavior
            setTimeout(() => {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'
                });
            }, 300);
        } else {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center'
            });
        }
    }, 150);
};

type TrainingForm = {
    trainingName: string;
    exerciseType: string;
    date: Date;
    exercises: {
        exerciseName: string;
        sets: number;
        reps: number;
        weight: number;
        notes: string;
    }[];
};

const CreateTraining: React.FC = () => {
    const [preview, setPreview] = useState(false);
    const platforms = getPlatforms();
    const isAndroid = platforms.includes('android');
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TrainingForm>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "exercises"
    });
    const formValues = useWatch({ control });

    useEffect(() => {
        const setupKeyboardListeners = async () => {
            await Keyboard.setResizeMode({ mode: 'body' });
            await Keyboard.setScroll({ isDisabled: true });
            
            const showListener = await Keyboard.addListener('keyboardWillShow', () => {
                // Additional Android-specific handling if needed
                if (isAndroid) {
                    document.body.classList.add('keyboard-is-open');
                }
            });

            const hideListener = await Keyboard.addListener('keyboardWillHide', () => {
                if (isAndroid) {
                    document.body.classList.remove('keyboard-is-open');
                }
            });

            return () => {
                showListener.remove();
                hideListener.remove();
            };
        };

        setupKeyboardListeners();
    }, [isAndroid]);

    const onSubmit = (data: TrainingForm) => {
        // Get existing trainings from localStorage or initialize empty array
        const existingTrainings = JSON.parse(localStorage.getItem('trainings') || '[]');
        const date = new Date();
        data.date = date;
        // Add new training to array
        const updatedTrainings = [...existingTrainings, data];
        
        // Save updated trainings back to localStorage
        localStorage.setItem('trainings', JSON.stringify(updatedTrainings));
        
        // Navigate back to home page
        window.history.back();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Criar Treino</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent 
                className="ion-padding" 
                scrollY={true}
                fullscreen={true}
                keyboardClose={false}
                style={{
                    '--keyboard-offset': '0px',
                }}
            >
                <IonItem >
                    <IonLabel position="stacked" className="input-label text-25" >Nome do Treino</IonLabel>
                        <IonInput
                        type="text"
                        {...register("trainingName", {
                            required: "O nome do treino é obrigatório",
                        })}
                    />
                    <div style={{marginTop: '1rem'}}>
                        {errors.trainingName && (
                            <p className="error">{errors.trainingName.message}</p>
                        )}
                    </div>
                </IonItem>

                {/* Exercise Type */}
                <IonItem>
                    <IonLabel position="stacked" class="input-label">Tipo do exercício</IonLabel>
                        <IonSelect 
                            {...register("exerciseType", {
                                required: "O tipo de exercício é obrigatório",
                            })}
                            value={formValues.exerciseType}
                            interface="action-sheet"
                            interfaceOptions={{
                                header: 'Selecione o tipo de exercício',
                                cssClass: 'custom-select'
                            }}
                            placeholder="Escolha o tipo"
                            cancelText="Cancelar"
                            okText="OK"
                            mode="ios"
                            class="custom-select-exercise-type"
                        >
                            {exerciseTypes.map((part) => (
                                <IonSelectOption key={part} value={part}>
                                    {part}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                </IonItem>

                {/* Lista de Exercícios */}
                {fields.map((field, index) => (
                    <div key={field.id} className="exercise-form ion-margin-vertical">
                        <h4>Exercício {index + 1}</h4>
                        {/* Exercise Name */}
                        <Controller
                            name={`exercises.${index}.exerciseName`}
                            control={control}
                            defaultValue={''}
                            render={({ field }) => (
                                <IonItem>
                                    <IonLabel position="stacked" class="input-label">
                                        Nome do exercício
                                    </IonLabel>
                                    <IonInput
                                        type="text"
                                        value={field.value}
                                        onIonChange={(e: any) => field.onChange(e.detail.value)}
                                        onIonFocus={handleFocus}
                                    />
                                </IonItem>
                            )}
                        />
                        
                        {/* Number of Sets */}
                        <Controller
                            name={`exercises.${index}.sets`}
                            control={control}
                            defaultValue={3}
                            render={({ field }) => (
                                <IonItem>
                                    <IonLabel position="stacked" class="input-label">
                                        Número de séries
                                    </IonLabel>
                                    <IonRange
                                        min={1}
                                        max={10}
                                        pin={true}
                                        value={field.value}
                                        onIonChange={(e) => field.onChange(e.detail.value)}
                                    >
                                        <IonLabel slot="start">1</IonLabel>
                                        <IonLabel slot="end">10</IonLabel>
                                    </IonRange>
                                </IonItem>
                            )}
                        />

                        {/* Number of Reps */}
                        <Controller
                            name={`exercises.${index}.reps`}
                            control={control}
                            defaultValue={8}
                            render={({ field }) => (
                                <IonItem>
                                    <IonLabel position="stacked" class="input-label">
                                        Repetições por série
                                    </IonLabel>
                                    <IonRange
                                        min={1}
                                        max={20}
                                        pin={true}
                                        value={field.value}
                                        onIonChange={(e) => field.onChange(e.detail.value)}
                                    >
                                        <IonLabel slot="start">1</IonLabel>
                                        <IonLabel slot="end">20</IonLabel>
                                    </IonRange>
                                </IonItem>
                            )}
                        />

                        {/* Weight */}
                        <IonItem>
                            <IonLabel position="stacked" class="input-label">
                                Peso (kg)
                            </IonLabel>
                            <Controller
                                name={`exercises.${index}.weight`}
                                control={control}
                                defaultValue={0}
                                render={({ field }) => (
                                    <IonItem>
                                        <IonInput
                                            type="number"
                                            value={field.value}
                                            onIonChange={(e) => field.onChange(e.detail.value)}
                                        />
                                    </IonItem>
                                )}
                            />
                        </IonItem>

                        {/* Notes */}
                        <IonItem>
                            <IonLabel position="stacked" class="input-label">
                                Observações
                            </IonLabel>
                            <IonTextarea
                                {...register(`exercises.${index}.notes`)}
                                value={field.value}
                                onIonChange={(e) => field.onChange(e.detail.value)}
                            />
                        </IonItem>

                        <IonButton
                            color="danger"
                            fill="outline"
                            onClick={() => remove(index)}
                            className="ion-margin-top"
                        >
                            Remover Exercício
                        </IonButton>
                    </div>
                ))}

                <IonButton
                    expand="block"
                    fill="outline"
                    onClick={() => append({
                        exerciseName: '',
                        sets: 3,
                        reps: 8,
                        weight: 0,
                        notes: ''
                    })}
                    className="ion-margin-top"
                >
                    Adicionar Exercício
                </IonButton>

                {/* Preview Toggle */}
                <IonButton
                    fill="outline"
                    onClick={() => setPreview(!preview)}
                    className="ion-margin-top"
                >
                    {preview ? "Ocultar Prévia" : "Mostrar Prévia"}
                </IonButton>

                {/* Preview Section */}
                {preview && (
                    <div className="preview-card ion-padding">
                        {/* ... rest of your preview section ... */}
                    </div>
                )}

                <IonButton
                    expand="block"
                    type="submit"
                    className="ion-margin-top"
                    onClick={handleSubmit(onSubmit)}
                >
                    Salvar Treino
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default CreateTraining;