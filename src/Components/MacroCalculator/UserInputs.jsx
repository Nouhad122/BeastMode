import React, { useState } from "react";
import { Form, useActionData } from "react-router-dom";
import classes from "./UserInputs.module.css";
import Button from "../sharedComps/Button";
import { VscDebugStart } from "react-icons/vsc";

const UserInputs = () => {
  const actionData = useActionData(); // Get errors from form action

  const [unit, setUnit] = useState("imperial");
  const [primaryGoal, setPrimaryGoal] = useState("lose_fat");
  const [gender, setGender] = useState("male");

  return (
    <Form method="post">
      <h2 className={classes["header"]}>Macro Calculator</h2>

      {/* Preferred Units */}
      <div className={classes["form-group"]}>
        <label className={classes["main-label"]}>Preferred Units</label>
        <div className={classes["option"]}>
          <input type="radio" name="unit" value="imperial" defaultChecked />
          <label className={classes["radio"]}>Imperial</label>

          <input type="radio" name="unit" value="metric" />
          <label className={classes["radio"]}>Metric</label>
        </div>
      </div>

      {/* Primary Goal */}
      <div className={classes["form-group"]}>
        <label className={classes["main-label"]}>My Primary Goal is</label>
        <div className={classes["option"]}>
          <input type="radio" name="primaryGoal" value="lose_fat" defaultChecked />
          <label className={classes["radio"]}>Lose Fat</label>

          <input type="radio" name="primaryGoal" value="build_muscle" />
          <label className={classes["radio"]}>Build Muscle</label>

          <input type="radio" name="primaryGoal" value="maintain_weight" />
          <label className={classes["radio"]}>Maintain Weight</label>
        </div>
      </div>

      {/* Gender */}
      <div className={classes["form-group"]}>
        <label className={classes["main-label"]}>Gender</label>
        <div className={classes["option"]}>
          <input type="radio" name="gender" value="male" defaultChecked />
          <label className={classes["radio"]}>Male</label>

          <input type="radio" name="gender" value="female" />
          <label className={classes["radio"]}>Female</label>
        </div>
      </div>

      {/* Age, Weight, Height */}
      <div className={classes["flex-text"]}>
        <div className={classes["form-group"]}>
          <label className={classes["main-label"]}>Age</label>
          <input type="number" name="age" placeholder="years old" />
          {actionData?.errors?.age && <p className={classes.error}>{actionData.errors.age}</p>}
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["main-label"]}>Weight (lbs)</label>
          <input type="number" name="weight" placeholder="lbs" />
          {actionData?.errors?.weight && <p className={classes.error}>{actionData.errors.weight}</p>}
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["main-label"]}>Height (feet)</label>
          <input type="number" name="height" placeholder="feet" />
          {actionData?.errors?.height && <p className={classes.error}>{actionData.errors.height}</p>}
        </div>
      </div>

      {/* Activity Level */}
      <div className={classes["form-group"]}>
        <label className={classes["main-label"]}>Activity Level</label>
        <select name="activity" className={classes["select"]}>
          <option value="sedentary">Sedentary (Little to no exercise)</option>
          <option value="light">Light (1-3 days per week)</option>
          <option value="moderate">Moderate (3-5 days per week)</option>
          <option value="active">Active (6-7 days per week)</option>
        </select>
      </div>

      {/* Submit and Clear Buttons */}
      <div className={classes["form-btns-wrapper"]}>
        <Button type="submit" className={classes["submit-btn"]}>
          Calculate <VscDebugStart />
        </Button>
        <Button type="reset" className={classes["clear-btn"]}>Clear</Button>
      </div>

      {/* Success Message */}
      {actionData?.success && <p className={classes.success}>{actionData.success}</p>}
    </Form>
  );
};

export default UserInputs;


export async function userInputsAction({ request }) {
    const formData = await request.formData();
  
    // Extract values
    const data = {
      unit: formData.get("unit"),
      primaryGoal: formData.get("primaryGoal"),
      gender: formData.get("gender"),
      age: formData.get("age"),
      weight: formData.get("weight"),
      height: formData.get("height"),
      activity: formData.get("activity"),
    };
  
    // Validation
    const errors = {};
    if (!data.age || data.age <= 0) errors.age = "Please enter a valid age.";
    if (!data.weight || data.weight <= 0) errors.weight = "Please enter a valid weight.";
    if (!data.height || data.height <= 0) errors.height = "Please enter a valid height.";
  
    if (Object.keys(errors).length > 0) {
      return { errors }; // Return validation errors
    }
  
    // Process the data (send to API or perform calculations)
    console.log("Form Submitted", data);
  
    return { success: "Form submitted successfully!" };
  }
  
