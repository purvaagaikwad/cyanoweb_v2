import React, { useState, useRef, useEffect, useCallback } from "react";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import "./Coagulation.css";

const Coagulation = () => {
  // const [visible, setVisible] = useState(false);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const toast = useRef(null);

  const defaultValues = {
    source: "", //dropdown
    date: "", //calendar
    model: "", //inputText
    device: "", //inputText

    //Experimental Conditions
    waterTemperature: "", //inputNumber
    waterpH: "", //inputNumber
    chemicalType: "", //dropdown
    otherChemicalType: "", //inputText
    manufacturer: "", //inputText
    chemicalDosage: "", //inputNumber
    mixingSpeed: "", //inputNumber
    reactionTime: "", //
    reactionUnit: "", //dropdown [Min,Sec]

    //Experimental results
    turbidityInitial: "",
    turbidityFinal: "",
    turbidityRemoval: "",
    totalMicrocystisInitial: "",
    totalMicrocystisFinal: "",
    totalMicrocystisRemoval: "",
    mcyeMicrocystisInitial: "",
    mcyeMicrocystisFinal: "",
    mcyeMicrocystisRemoval: "",
    mycePlanktothrixInitial: "",
    mycePlanktothrixFinal: "",
    mycePlanktothrixRemoval: "",
    totalMicrocystinsInitial: "",
    totalMicrocystinsFinal: "",
    totalMicrocystinsRemoval: "",

    // temperature: "", //inputNumber
    // pH: "", //inputNumber
    // turbidity: "", //inputNumber
    // dissolvedOxygen: "", //inputNumber
    // totalMicrocystis: "", //inputNumber
    // mycEMicrocystis: "", //inputNumber
    // mycEPlanktothrix: "", //inputNumber
    // totalMicrocystins: "", //inputNumber
  };

  const {
    form,
    reset,
    control,
    handleSubmit,
    getValues,
    formState,
    setValue,
    formState: { isSubmitSuccessful },
    watch,
  } = useForm({ defaultValues });

  const errors = formState.errors;

  const watchTurbidity = watch(["turbidityFinal", "turbidityInitial"]);
  const watchTotalMicrocystis = watch([
    "totalMicrocystisFinal",
    "totalMicrocystisInitial",
  ]);
  const watchmcyeMicrocystis = watch([
    "mcyeMicrocystisFinal",
    "mcyeMicrocystisInitial",
  ]);
  const watchmycePlanktothrix = watch([
    "mycePlanktothrixFinal",
    "mycePlanktothrixInitial",
  ]);
  const watchtotalMicrocystins = watch([
    "totalMicrocystinsFinal",
    "totalMicrocystinsInitial",
  ]);

  useEffect(() => {
    console.log("useeffect", watchTurbidity);
    console.log(
      (watchTurbidity[0] != "") &
        (watchTurbidity[1] != "") &
        (getValues("turbidityRemoval") != watchTurbidity[1] - watchTurbidity[0])
    );
    const interval = setTimeout(() => {
      if (
        (watchTurbidity[0] != "") &
        (watchTurbidity[1] != "") &
        (getValues("turbidityRemoval") != watchTurbidity[1] - watchTurbidity[0])
      ) {
        console.log("inside if");
        setValue("turbidityRemoval", watchTurbidity[1] - watchTurbidity[0]);
      }
      if (
        (watchTotalMicrocystis[0] != "") &
        (watchTotalMicrocystis[1] != "") &
        (getValues("totalMicrocystisRemoval") !=
          watchTotalMicrocystis[1] - watchTotalMicrocystis[0])
      ) {
        setValue(
          "totalMicrocystisRemoval",
          watchTotalMicrocystis[1] - watchTotalMicrocystis[0]
        );
      }
      if (
        (watchmcyeMicrocystis[0] != "") &
        (watchmcyeMicrocystis[1] != "") &
        (getValues("mcyeMicrocystisRemoval") !=
          watchmcyeMicrocystis[1] - watchmcyeMicrocystis[0])
      ) {
        setValue(
          "mcyeMicrocystisRemoval",
          watchmcyeMicrocystis[1] - watchmcyeMicrocystis[0]
        );
      }
      if (
        (watchmycePlanktothrix[0] != "") &
        (watchmycePlanktothrix[1] != "") &
        (getValues("mycePlanktothrixRemoval") !=
          watchmycePlanktothrix[1] - watchmycePlanktothrix[0])
      ) {
        setValue(
          "mycePlanktothrixRemoval",
          watchmycePlanktothrix[1] - watchmycePlanktothrix[0]
        );
      }
      if (
        (watchtotalMicrocystins[0] != "") &
        (watchtotalMicrocystins[1] != "") &
        (getValues("totalMicrocystinsRemoval") !=
          watchtotalMicrocystins[1] - watchtotalMicrocystins[0])
      ) {
        setValue(
          "totalMicrocystinsRemoval",
          watchtotalMicrocystins[1] - watchtotalMicrocystins[0]
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [
    watchTurbidity,
    watchTotalMicrocystis,
    watchmcyeMicrocystis,
    watchmycePlanktothrix,
    watchtotalMicrocystins,
  ]);

  const show = () => {
    const date = new Date(getValues("date")).toLocaleDateString();
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: getValues("value"),
    });
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: getValues("calendar"),
    });
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: getValues("dropdown.name"),
    }); //Need to use .name for accessing the name of the dropdown object
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: date,
    });
  };

  const onSubmit = (data) => {
    // data.value && show();
    // data.calendar && show();
    // data.dropdown && show();

    console.log(data);
    data.date && show();
    reset();
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <Message severity="error" text={errors[name].message} />
    ) : (
      <></>
    );
  };

  const experimentalConditions = () => {
    return (
      <>
        <div className="justify-content-center">Experimental Conditions</div>
        <div className="align-form-inputs">
          <Controller
            name="waterTemperature"
            control={control}
            rules={{
              required: "Enter a valid waterTemperature.",
              validate: (value) =>
                (value >= 0 && value <= 44) ||
                "Enter a valid waterTemperature.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "40px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={44}
                    suffix="℃"
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />{" "}
                  <label htmlFor={field.name} style={{color:"#62afb9"}}>waterTemperature</label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="waterpH"
            control={control}
            rules={{
              required: "Enter a valid waterpH.     ",
              validate: (value) =>
                (value >= 0 && value <= 14) || "Enter a valid waterpH.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "40px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                  <label htmlFor={field.name} style={{color:"#62afb9"}}>waterpH</label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="chemicalType"
            control={control}
            rules={{ required: "chemicalType is required." }}
            render={({ field, fieldState }) => (
              <div className=" align-items-center" style={{ margin: "40px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <Dropdown
                    value={field.value}
                    optionLabel="name"
                    placeholder="Select"
                    name={field.name}
                    options={cities}
                    control={control}
                    onChange={(e) => field.onChange(e.value)}
                    style={{ width: "53%" }}
                    className={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                  <label htmlFor={field.name} style={{color:"#62afb9"}}>chemicalType</label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="otherChemicalType"
            control={control}
            rules={{
              required: "Enter a valid otherChemicalType.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "40px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({ "p-invalid": fieldState.error })}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name} style={{color:"#62afb9"}}>otherChemicalType</label>
                </span>

                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="manufacturer"
            control={control}
            rules={{
              required: "Enter a valid manufacturer.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "40px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({ "p-invalid": fieldState.error })}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name} style={{color:"#62afb9"}}>manufacturer</label>
                </span>

                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="chemicalDosage"
            control={control}
            rules={{
              required: "Enter a valid chemicalDosage.",
              validate: (value) =>
                (value >= 0 && value <= 14) || "Enter a valid chemicalDosage.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "40px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    suffix="mg/L"
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                  <label htmlFor={field.name} style={{color:"#62afb9"}}>chemicalDosage</label>
                </span>

                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="mixingSpeed"
            control={control}
            rules={{
              required: "Enter a valid mixingSpeed.",
              validate: (value) =>
                (value >= 0 && value <= 14) || "Enter a valid mixingSpeed.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "40px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    suffix="rpm"
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                  <label htmlFor={field.name} style={{color:"#62afb9"}}>mixingSpeed</label>
                </span>

                <div>{getFormErrorMessage(field.name)}</div>
                {/* <div className="col-3 ">
                  <label htmlFor={field.name} style={{color:"#62afb9"}}>mixingSpeed</label>
                </div>
                <div className="col-3 ">
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    suffix="rpm"
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                </div>
                <div className="col-5">{getFormErrorMessage(field.name)}</div> */}
              </div>
            )}
          />
        </div>
        <div className="align-form-inputs">
          <Controller
            name="reactionTime"
            control={control}
            rules={{
              required: "Enter a valid reactionTime.",
              validate: (value) =>
                (value >= 0 && value <= 14) || "Enter a valid reactionTime.",
            }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "40px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    suffix="rpm"
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                  <label htmlFor={field.name} style={{color:"#62afb9"}}>reactionTime</label>
                </span>

                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
          <Controller
            name="reactionUnit"
            control={control}
            rules={{ required: "reaction unit is required." }}
            render={({ field, fieldState }) => (
              <div className="align-items-center" style={{ margin: "40px" }}>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  {/* <div className="col-3"> */}
                  <Dropdown
                    value={field.value}
                    optionLabel="name"
                    placeholder="Select"
                    name={"reactionUnit"}
                    options={[
                      { name: "Minutes", code: "m" },
                      { name: "Seconds", code: "s" },
                    ]}
                    control={control}
                    onChange={(e) => field.onChange(e.value)}
                    style={{ width: "53%" }}
                    className={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />

                  <label htmlFor={field.name} style={{color:"#62afb9"}}>reactionUnit</label>
                </span>
                {/* </div> */}

                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
      </>
    );
  };

  const genericParameterComponent = (name, usedName, fieldName) => {
    const parameters = {
      initial: name + "Initial",
      initialUsedName: usedName + " Initial",
      final: name + "Final",
      finalUsedName: usedName + " Final",
      removal: name + "Removal",
      removalUsedName: usedName + " Removal",
    };
    console.log(parameters);
    return (
      <div className="grid align-items-center" style={{ margin: "10px" }}>
        {/* <div className=""> */}
        <div className="col-3">{fieldName}</div>
        <div className="col-3">
          {/* <label htmlFor="integer" >
                        Integer
                    </label>
                    <InputText id="integer" keyfilter="int" className="w-full" /> */}
          <Controller
            name={parameters.initial}
            control={control}
            rules={{
              required: `Enter a valid ${parameters.initialUsedName}.`,
              validate: (value) =>
                (value >= 0 && value <= 14) ||
                `Enter a valid ${parameters.initialUsedName}.,`,
            }}
            render={({ field, fieldState }) => (
              <div>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    // style={{ width: "50%" }}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                  <label htmlFor={field.name} style={{color:"#62afb9"}}>
                    {parameters.initialUsedName}
                  </label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>

        <div className="col-3">
          {/* <label htmlFor="number" className="font-bold block mb-2">
                        Number
                    </label>
                    <InputText id="number" keyfilter="num" className="w-full" /> */}
          <Controller
            name={parameters.final}
            control={control}
            rules={{
              required: `Enter a valid ${parameters.finalUsedName}.`,
              validate: (value) =>
                (value >= 0 && value <= 14) ||
                `Enter a valid ${parameters.finalUsedName}.,`,
            }}
            render={({ field, fieldState }) => (
              <div>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    // style={{ width: "50%" }}
                    max={14}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                  <label htmlFor={field.name} style={{color:"#62afb9"}}>{parameters.finalUsedName}</label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        <div className="col-3">
          {/* <label htmlFor="money" className="font-bold block mb-2">
                        Money
                    </label> */}
          <Controller
            name={parameters.removal}
            control={control}
            rules={{
              required: `Enter a valid ${parameters.removalUsedName}.`,
              validate: (value) =>
                (value >= 0 && value <= 14) ||
                `Enter a valid ${parameters.removalUsedName}.,`,
            }}
            render={({ field, fieldState }) => (
              <div>
                <span className="p-float-label" style={{ margin: "5px" }}>
                  <InputNumber
                    onValueChange={(e) => field.onChange(e)}
                    id={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    min={0}
                    max={14}
                    // style={{ width: "50%" }}
                    disabled
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                  />
                  <label htmlFor={field.name} style={{color:"#62afb9"}}>
                    {parameters.removalUsedName}
                  </label>
                </span>
                <div>{getFormErrorMessage(field.name)}</div>
              </div>
            )}
          />
        </div>
        {/* </div> */}
      </div>
    );
  };

  const basicInformation = () => {
    return (
      <>
        <div style={{ padding: "5px" }}>Basic Information</div>
        <div className="grid align-items-center justify-content-center">
          <div className="align-form-inputs">
            <Controller
              name="source"
              control={control}
              rules={{ required: "source is required." }}
              render={({ field, fieldState }) => (
                <div className="align-items-center" style={{ margin: "20px" }}>
                  <span className="p-float-label" style={{ margin: "5px" }}>
                    <Dropdown
                      value={field.value}
                      optionLabel="name"
                      placeholder="Select"
                      name={field.name}
                      options={cities}
                      control={control}
                      onChange={(e) => field.onChange(e.value)}
                      style={{ width: "100%" }}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                    <label htmlFor={field.name} style={{color:"#62afb9"}}>source</label>
                  </span>
                  <div>{getFormErrorMessage(field.name)}</div>
                </div>
              )}
            />
          </div>
          <div className="align-form-inputs">
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required." }}
              render={({ field, fieldState }) => (
                <div className="align-items-center" style={{ margin: "20px" }}>
                  <span className="p-float-label" style={{ margin: "5px" }}>
                    <Calendar
                      inputId={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      dateFormat="mm/dd/yy"
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                    <label htmlFor={field.name} style={{color:"#62afb9"}}>date</label>
                  </span>
                  <div>{getFormErrorMessage(field.name)}</div>
                </div>
              )}
            />
          </div>
          <div className="align-form-inputs">
            <Controller
              name="model"
              control={control}
              rules={{
                required: "Enter a valid model.",
              }}
              render={({ field, fieldState }) => (
                <div className="align-items-center" style={{ margin: "20px" }}>
                  <span className="p-float-label" style={{ margin: "5px" }}>
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name} style={{color:"#62afb9"}}>model</label>
                  </span>
                  <div>{getFormErrorMessage(field.name)}</div>
                </div>
              )}
            />
          </div>
          <div className="align-form-inputs">
            <Controller
              name="device"
              control={control}
              rules={{
                required: "Enter a valid device.",
              }}
              render={({ field, fieldState }) => (
                <div className="align-items-center" style={{ margin: "20px" }}>
                  <span className="p-float-label" style={{ margin: "5px" }}>
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name} style={{color:"#62afb9"}}>device</label>
                  </span>
                  <div>{getFormErrorMessage(field.name)}</div>
                </div>
              )}
            />
          </div>
        </div>
      </>
    );
  };

  const experimentalResults = () => {
    return (
      <>
        <div className="justify-content-center">Experimental Results</div>
        <div className="align-form-inputs">
          {genericParameterComponent(
            "turbidity",
            "Turbidity",
            "Turbidity(NTU)"
          )}
          {genericParameterComponent(
            "totalMicrocystis",
            "Total Microcystis",
            "Total Microcystis (PC-IGS) (Log gene copies/L)"
          )}
          {genericParameterComponent(
            "mcyeMicrocystis",
            "mcye Microcystis",
            "mcye Microcystis(Log gene copies/L)"
          )}
          {genericParameterComponent(
            "mycePlanktothrix",
            "myce Planktothrix",
            "mcye Planktothrix(Log gene copies/L)"
          )}
          {genericParameterComponent(
            "totalMicrocystins",
            "Total Microcystins",
            "Total Microcystins(ppb)"
          )}
        </div>
      </>
    );
  };

  return (
    <div>
      <div
        className="card justify-content-center dialog-margin"
        style={{
          // backgroundColor: "#2f478a",
          borderRadius: "15px",
          margin: "10px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>{basicInformation()}</div>
          <div className="grid">
            <div className="col-4" style={{borderStyle:"dotted"}}>{experimentalConditions()}</div>
            <div className="col-8" style={{borderStyle:"dotted"}}>{experimentalResults()}</div>
          </div>

          <Button
            label="Submit"
            type="submit"
            icon="pi pi-check"
            style={{ margin: "10px" }}
          />
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default Coagulation;
