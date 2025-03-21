console.log("Starting Matchmaker Lite...");
function calculateCompatibility() {
  console.log("calculatingCompatibility()");
  if (!validate()) {
    return;
}
    const DESIRED_RESPONSE = [
        0,
        5,  /* Strongly Agree */
        4,  /* Agree */
        3,  /* Neither agree nor disagree */
        2,  /* Disagree */
        1,  /* Strongly Disagree */
    ];
    const MAX_SCORE = 25;
    const TOTAL_QUESTIONS = 5;
    let totalCompatibility = 0;

    for (let i= 1; i <= TOTAL_QUESTIONS; i++) {
      let questionResponse = document.getElementById("q"+i).selectedOptions[0].value;
      let responseText = document.getElementById("q"+i).selectedOptions[0].text;

      let desiredValue = DESIRED_RESPONSE[i === 3 || i === 5 ? 2 : 0];
     
      let compatibility = 5 - Math.abs(questionResponse - desiredValue);
      totalCompatibility += compatibility;

      console.log("Question: " + document.querySelector(`label[for="q${i}"]`).innerHTML);
      console.log("Text: " + responseText);
      console.log("Value: " + questionResponse);
      console.log("Compatibility Score: " + compatibility);
    }
        totalCompatibility = Math.round((totalCompatibility / MAX_SCORE) * 100);
        console.log("Total Compatibility = " + totalCompatibility);
        document.getElementById("compatibility").innerHTML = "Your compatibility is: " + totalCompatibility;
        displayCompatibilityMessage(totalCompatibility);
}
function validate() {
  let isValid = true;
  let errorMessage = "";
  const TOTAL_QUESTIONS = 5;
  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
      let questionElement = document.getElementById(`q${i}`);
      if (!questionElement || questionElement.value === "0") {
          isValid = false;
          let questionLabel = document.querySelector(`label[for="q${i}"]`)?.innerText || `Question ${i}`;
          errorMessage += `"${questionLabel}" is unanswered.\n`;
      }
  }
  if (!isValid) {
      console.log("Validation failed:");
      console.log(errorMessage);
      document.getElementById("errorMessage").innerHTML = errorMessage.replace(/\n/g, " Please select an answer for all questions.");
  } else {
      document.getElementById("errorMessage").innerHTML = "";
  }
  return isValid;
}
function displayCompatibilityMessage(totalCompatibility) {
  let message = "";
      if (totalCompatibility >= 99) {
          message = "You're perfect, wanna get married?";
      }else if (totalCompatibility >= 80) {
          message = "Wanna go out?";
      } else if (totalCompatibility >= 60) {
          message = "I'm interested, wanna chat?";
      } else if (totalCompatibility >= 40) {
          message = "I'll think about it, wanna be friends?";
      } else {
          message = "Let's just be friends.";
      }
    console.log(message);
  document.getElementById("compatibilityMessage").innerHTML = message;
}