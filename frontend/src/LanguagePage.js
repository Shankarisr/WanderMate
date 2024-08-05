// // import React, { useState } from 'react';
// // import styled from 'styled-components';

// // const LanguageLearningPage = () => {
// //     const [formData, setFormData] = useState({
// //         destination: '',
// //         language: '',
// //         phraseCategories: [],
// //         specificPhrases: ''
// //     });
// //     const [phrases, setPhrases] = useState([]);
// //     const [error, setError] = useState(null);

// //     const handleChange = (e) => {
// //         const { name, value, type, checked } = e.target;
// //         if (type === 'checkbox') {
// //             setFormData({
// //                 ...formData,
// //                 [name]: checked
// //                     ? [...formData[name], value]
// //                     : formData[name].filter(item => item !== value)
// //             });
// //         } else {
// //             setFormData({
// //                 ...formData,
// //                 [name]: value
// //             });
// //         }
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const response = await fetch('http://localhost:3010/api/language-learning', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 },
// //                 body: JSON.stringify(formData)
// //             });

// //             if (!response.ok) {
// //                 const text = await response.text();
// //                 throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
// //             }

// //             const result = await response.json();
// //             setPhrases(result.phrases);
// //             setError(null);
// //         } catch (error) {
// //             setError(error.message);
// //             setPhrases([]);
// //         }
// //     };

// //     return (
// //         <Container>
// //             <Title>Language Learning</Title>
// //             <Form onSubmit={handleSubmit}>
// //                 <FormGroup>
// //                     <Label htmlFor="destination">Destination:</Label>
// //                     <Input
// //                         type="text"
// //                         id="destination"
// //                         name="destination"
// //                         value={formData.destination}
// //                         onChange={handleChange}
// //                         required
// //                     />
// //                 </FormGroup>
// //                 <FormGroup>
// //                     <Label htmlFor="language">Language:</Label>
// //                     <Input
// //                         type="text"
// //                         id="language"
// //                         name="language"
// //                         value={formData.language}
// //                         onChange={handleChange}
// //                         required
// //                     />
// //                 </FormGroup>
// //                 <FormGroup>
// //                     <Label>Phrase Categories:</Label>
// //                     <Checkboxes>
// //                         <label>
// //                             <input
// //                                 type="checkbox"
// //                                 name="phraseCategories"
// //                                 value="greetings"
// //                                 checked={formData.phraseCategories.includes('greetings')}
// //                                 onChange={handleChange}
// //                             />
// //                             Greetings
// //                         </label>
// //                         <label>
// //                             <input
// //                                 type="checkbox"
// //                                 name="phraseCategories"
// //                                 value="directions"
// //                                 checked={formData.phraseCategories.includes('directions')}
// //                                 onChange={handleChange}
// //                             />
// //                             Directions
// //                         </label>
// //                         <label>
// //                             <input
// //                                 type="checkbox"
// //                                 name="phraseCategories"
// //                                 value="food"
// //                                 checked={formData.phraseCategories.includes('food')}
// //                                 onChange={handleChange}
// //                             />
// //                             Food & Dining
// //                         </label>
// //                         <label>
// //                             <input
// //                                 type="checkbox"
// //                                 name="phraseCategories"
// //                                 value="emergency"
// //                                 checked={formData.phraseCategories.includes('emergency')}
// //                                 onChange={handleChange}
// //                             />
// //                             Emergency Phrases
// //                         </label>
// //                         {/* Add more categories as needed */}
// //                     </Checkboxes>
// //                 </FormGroup>
// //                 <FormGroup>
// //                     <Label htmlFor="specificPhrases">Specific Phrases:</Label>
// //                     <Input
// //                         type="text"
// //                         id="specificPhrases"
// //                         name="specificPhrases"
// //                         value={formData.specificPhrases}
// //                         onChange={handleChange}
// //                     />
// //                 </FormGroup>
// //                 <SubmitButton type="submit">Get Phrases</SubmitButton>
// //             </Form>
// //             {error && <ErrorMessage>{error}</ErrorMessage>}
// //             {phrases && (
// //                 <ResultsContainer>
// //                     <h2>Learn Basic Phrases:</h2>
// //                     {phrases.map((phrase, index) => (
// //                         <div key={index}>
// //                             <Phrase>{phrase.original} - <Translation>{phrase.translation}</Translation></Phrase>
// //                             {phrase.pronunciation && <Pronunciation>{phrase.pronunciation}</Pronunciation>}
// //                             {phrase.culturalNote && <CulturalNote>{phrase.culturalNote}</CulturalNote>}
// //                         </div>
// //                     ))}
// //                 </ResultsContainer>
// //             )}
// //         </Container>
// //     );
// // };

// // // Styled Components
// // const Container = styled.div`
// //   font-family: "Arial", sans-serif;
// //   padding: 40px;
// //   max-width: 900px;
// //   margin: auto;
// //   background-color: #f5f5f5;
// //   border-radius: 8px;
// //   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
// // `;

// // const Title = styled.h1`
// //   color: #004d61;
// //   text-align: center;
// //   margin-bottom: 20px;
// // `;

// // const Form = styled.form`
// //   background: white;
// //   padding: 20px;
// //   border-radius: 8px;
// //   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// // `;

// // const FormGroup = styled.div`
// //   margin-bottom: 15px;
// // `;

// // const Label = styled.label`
// //   display: block;
// //   margin-bottom: 5px;
// //   font-weight: bold;
// //   color: #333;
// // `;

// // const Input = styled.input`
// //   width: 100%;
// //   padding: 10px;
// //   border: 1px solid #ddd;
// //   border-radius: 5px;
// //   font-size: 16px;
// // `;

// // const Checkboxes = styled.div`
// //   margin-bottom: 10px;

// //   label {
// //     display: block;
// //     margin-bottom: 5px;
// //   }

// //   input {
// //     margin-right: 10px;
// //   }
// // `;

// // const SubmitButton = styled.button`
// //   padding: 12px 20px;
// //   font-size: 1.1em;
// //   color: #fff;
// //   background-color: #004d61;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   transition: background-color 0.3s ease;

// //   &:hover {
// //     background-color: #003843;
// //   }
// // `;

// // const ResultsContainer = styled.div`
// //   margin-top: 20px;
// //   padding: 20px;
// //   background-color: #fff;
// //   border: 1px solid #ddd;
// //   border-radius: 8px;
// //   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// //   font-size: 16px;
// //   line-height: 1.6;
// // `;

// // const Phrase = styled.div`
// //   font-weight: bold;
// // `;

// // const Translation = styled.span`
// //   font-style: italic;
// //   color: #007BFF;
// // `;

// // const Pronunciation = styled.div`
// //   color: #666;
// //   margin-top: 5px;
// // `;

// // const CulturalNote = styled.div`
// //   color: #888;
// //   margin-top: 10px;
// // `;

// // const ErrorMessage = styled.div`
// //   color: red;
// //   margin-top: 20px;
// //   font-weight: bold;
// // `;

// // export default LanguageLearningPage;

// import React, { useState } from 'react';
// import styled from 'styled-components';

// const LanguageLearningPage = () => {
//     const [formData, setFormData] = useState({
//         destination: '',
//         language: '',
//         phraseCategories: [],
//         specificPhrases: ''
//     });
//     const [phrases, setPhrases] = useState([]);
//     const [error, setError] = useState(null);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         if (type === 'checkbox') {
//             setFormData({
//                 ...formData,
//                 [name]: checked
//                     ? [...formData[name], value]
//                     : formData[name].filter(item => item !== value)
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: value
//             });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:3050/api/language-learning', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (!response.ok) {
//                 const text = await response.text();
//                 throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
//             }

//             const result = await response.json();
//             setPhrases(result.phrases);
//             setError(null);
//         } catch (error) {
//             setError(error.message);
//             setPhrases([]);
//         }
//     };

//     return (
//         <Container>
//             <Title>Language Learning</Title>
//             <Form onSubmit={handleSubmit}>
//                 <FormGroup>
//                     <Label htmlFor="destination">Destination:</Label>
//                     <Input
//                         type="text"
//                         id="destination"
//                         name="destination"
//                         value={formData.destination}
//                         onChange={handleChange}
//                         required
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label htmlFor="language">Language:</Label>
//                     <Input
//                         type="text"
//                         id="language"
//                         name="language"
//                         value={formData.language}
//                         onChange={handleChange}
//                         required
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label>Phrase Categories:</Label>
//                     <Checkboxes>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 name="phraseCategories"
//                                 value="greetings"
//                                 checked={formData.phraseCategories.includes('greetings')}
//                                 onChange={handleChange}
//                             />
//                             Greetings
//                         </label>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 name="phraseCategories"
//                                 value="directions"
//                                 checked={formData.phraseCategories.includes('directions')}
//                                 onChange={handleChange}
//                             />
//                             Directions
//                         </label>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 name="phraseCategories"
//                                 value="food"
//                                 checked={formData.phraseCategories.includes('food')}
//                                 onChange={handleChange}
//                             />
//                             Food & Dining
//                         </label>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 name="phraseCategories"
//                                 value="emergency"
//                                 checked={formData.phraseCategories.includes('emergency')}
//                                 onChange={handleChange}
//                             />
//                             Emergency Phrases
//                         </label>
//                     </Checkboxes>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label htmlFor="specificPhrases">Specific Phrases:</Label>
//                     <Input
//                         type="text"
//                         id="specificPhrases"
//                         name="specificPhrases"
//                         value={formData.specificPhrases}
//                         onChange={handleChange}
//                     />
//                 </FormGroup>
//                 <SubmitButton type="submit">Get Phrases</SubmitButton>
//             </Form>
//             {error && <ErrorMessage>{error}</ErrorMessage>}
//             {phrases.length > 0 && (
//                 <ResultsContainer>
//                     <h2>Learn Basic Phrases:</h2>
//                     {phrases.map((phrase, index) => (
//                         <PhraseCard key={index}>
//                             <Phrase>{phrase.original}</Phrase>
//                             <Translation>{phrase.translation}</Translation>
//                             {phrase.pronunciation && <Pronunciation>{phrase.pronunciation}</Pronunciation>}
//                             {phrase.culturalNote && <CulturalNote>{phrase.culturalNote}</CulturalNote>}
//                         </PhraseCard>
//                     ))}
//                 </ResultsContainer>
//             )}
//         </Container>
//     );
// };

// // Styled Components
// const Container = styled.div`
//   font-family: "Arial", sans-serif;
//   padding: 40px;
//   max-width: 900px;
//   margin: auto;
//   background-color: #f5f5f5;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
// `;

// const Title = styled.h1`
//   color: #004d61;
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const Form = styled.form`
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// `;

// const FormGroup = styled.div`
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   font-weight: bold;
//   color: #333;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-size: 16px;
// `;

// const Checkboxes = styled.div`
//   margin-bottom: 10px;

//   label {
//     display: block;
//     margin-bottom: 5px;
//   }

//   input {
//     margin-right: 10px;
//   }
// `;

// const SubmitButton = styled.button`
//   padding: 12px 20px;
//   font-size: 1.1em;
//   color: #fff;
//   background-color: #004d61;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #003843;
//   }
// `;

// const ResultsContainer = styled.div`
//   margin-top: 20px;
//   padding: 20px;
//   background-color: #fff;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//   font-size: 16px;
//   line-height: 1.6;
// `;

// const PhraseCard = styled.div`
//   margin-bottom: 15px;
//   padding: 15px;
//   background: #f9f9f9;
//   border-radius: 5px;
//   box-shadow: 0 1px 3px rgba(0,0,0,0.1);
// `;

// const Phrase = styled.div`
//   font-weight: bold;
//   font-size: 1.2em;
// `;

// const Translation = styled.div`
//   font-style: italic;
//   color: #007BFF;
//   margin-top: 5px;
// `;

// const Pronunciation = styled.div`
//   color: #666;
//   margin-top: 5px;
// `;

// const CulturalNote = styled.div`
//   color: #888;
//   margin-top: 10px;
// `;

// const ErrorMessage = styled.div`
//   color: red;
//   margin-top: 20px;
//   font-weight: bold;
// `;

// export default LanguageLearningPage;

import React, { useState } from 'react';
import styled from 'styled-components';

const LanguageLearningPage = () => {
    const [formData, setFormData] = useState({
        destination: '',
        language: '',
        phraseCategories: [],
        specificPhrases: ''
    });
    const [phrases, setPhrases] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: checked
                    ? [...prevFormData[name], value]
                    : prevFormData[name].filter((item) => item !== value),
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const cleanPhraseText = (text) => {
        return text
            .replace(/## /g, '') // Remove heading markers
            .replace(/\*\*/g, '') // Remove bold markers
            .replace(/\*/g, '') // Remove italic markers
            .trim(); // Trim extra spaces
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3050/api/language-learning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
            }

            const result = await response.json();
            const cleanedPhrases = result.phrases.map(phrase => ({
                original: cleanPhraseText(phrase.original),
                translation: cleanPhraseText(phrase.translation),
                pronunciation: cleanPhraseText(phrase.pronunciation),
                culturalNote: cleanPhraseText(phrase.culturalNote)
            }));

            setPhrases(cleanedPhrases);
            setError(null);
        } catch (error) {
            setError(error.message);
            setPhrases([]);
        }
    };

    return (
        <Container>
            <Title>Language Learning</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="destination">Destination:</Label>
                    <Input
                        type="text"
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="language">Language:</Label>
                    <Input
                        type="text"
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Phrase Categories:</Label>
                    <Checkboxes>
                        <label>
                            <input
                                type="checkbox"
                                name="phraseCategories"
                                value="greetings"
                                checked={formData.phraseCategories.includes('greetings')}
                                onChange={handleChange}
                            />
                            Greetings
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="phraseCategories"
                                value="directions"
                                checked={formData.phraseCategories.includes('directions')}
                                onChange={handleChange}
                            />
                            Directions
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="phraseCategories"
                                value="food"
                                checked={formData.phraseCategories.includes('food')}
                                onChange={handleChange}
                            />
                            Food & Dining
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="phraseCategories"
                                value="emergency"
                                checked={formData.phraseCategories.includes('emergency')}
                                onChange={handleChange}
                            />
                            Emergency Phrases
                        </label>
                    </Checkboxes>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="specificPhrases">Specific Phrases:</Label>
                    <Input
                        type="text"
                        id="specificPhrases"
                        name="specificPhrases"
                        value={formData.specificPhrases}
                        onChange={handleChange}
                    />
                </FormGroup>
                <SubmitButton type="submit">Get Phrases</SubmitButton>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {phrases.length > 0 && (
                <ResultsContainer>
                    <h2>Learn Basic Phrases:</h2>
                    {phrases.map((phrase, index) => (
                        <PhraseCard key={index}>
                            {phrase.original && <Original>{phrase.original}</Original>}
                            {phrase.translation && <Translation>{phrase.translation}</Translation>}
                            {phrase.pronunciation && <Pronunciation>{phrase.pronunciation}</Pronunciation>}
                            {phrase.culturalNote && <CulturalNote>{phrase.culturalNote}</CulturalNote>}
                        </PhraseCard>
                    ))}
                </ResultsContainer>
            )}
        </Container>
    );
};

// Styled Components
const Container = styled.div`
  font-family: "Arial", sans-serif;
  padding: 40px;
  max-width: 900px;
  margin: auto;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  color: #004d61;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Checkboxes = styled.div`
  margin-bottom: 10px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    margin-right: 10px;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  font-size: 1.1em;
  color: #fff;
  background-color: #004d61;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003843;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-size: 16px;
  line-height: 1.6;
`;

const PhraseCard = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Original = styled.div`
  font-weight: bold;
  font-size: 1.2em;
`;

const Translation = styled.div`
  font-style: italic;
  color: #007BFF;
  margin-top: 5px;
`;

const Pronunciation = styled.div`
  color: #666;
  margin-top: 5px;
`;

const CulturalNote = styled.div`
  color: #888;
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
  font-weight: bold;
`;

export default LanguageLearningPage;
