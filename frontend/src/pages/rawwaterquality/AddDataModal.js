import React, { useState, useRef, useEffect } from "react";
import "./AddDataModal.css";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

const AddDataModal = () => {
  const [visible, setVisible] = useState(false);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const toast = useRef(null);

  const defaultValues = {
    location: "", //dropdown
    date: "", //calendar
    temperature: "", //inputNumber
    pH: "", //inputNumber
    turbidity: "", //inputNumber
    dissolvedOxygen: "", //inputNumber
    totalMicrocystis: "", //inputNumber
    mycEMicrocystis: "", //inputNumber
    mycEPlanktothrix: "", //inputNumber
    totalMicrocystins: "", //inputNumber
  };

  const {
    form,
    reset,
    control,
    handleSubmit,
    getValues,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues });

  const errors = formState.errors;

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
    // console.log(formState.isSubmitSuccessful);
    reset();
    setVisible();
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <Message severity="error" text={errors[name].message} />
    ) : (
      <></>
    );
  };
  return (
    <div>
      <div className="align-left">
        <Button
          label="Upload Raw Water Data"
          icon="pi "
          onClick={() => setVisible(true)}
          className="p-button"
          style={{ minWidth: "10rem" }}
        />
      </div>

      <Toast ref={toast} />
      <Dialog
        header="Raw Water Data"
        className="center-header"
        visible={visible}
        position={"top"}
        style={{ width: "50vw" }}
        onHide={() => {
          reset();
          setVisible(false);
        }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        draggable={false}
        resizable={false}
      >
        <div className="card justify-content-center dialog-margin">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-column gap-2"
          >
            <div className="align-form-inputs">
              <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required." }}
                render={({ field, fieldState }) => (
                  <div className="grid align-items-center">
                    <div className="col-3 ">
                      <label htmlFor={field.name}>Location</label>
                    </div>
                    <div className="col-4">
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
                    </div>

                    <div className="col-5">
                      {getFormErrorMessage(field.name)}
                    </div>
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
                  <div className="grid align-items-center">
                    <div className="col-3 ">
                      <label htmlFor={field.name}>Date</label>
                    </div>
                    <div className="col-4">
                      <Calendar
                        inputId={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        dateFormat="mm/dd/yy"
                        className={classNames({
                          "p-invalid": fieldState.error,
                        })}
                      />
                    </div>
                    <div className="col-5">
                      {getFormErrorMessage(field.name)}
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="align-form-inputs">
              <Controller
                name="pH"
                control={control}
                rules={{
                  required: "Enter a valid pH.",
                  validate: (value) =>
                    (value >= 0 && value <= 14) || "Enter a valid pH.",
                }}
                render={({ field, fieldState }) => (
                  <div className="grid align-items-center">
                    <div className="col-3 ">
                      <label htmlFor={field.name}>pH</label>
                    </div>
                    <div className="col-4 ">
                      <InputNumber
                        id={field.name}
                        inputRef={field.ref}
                        value={field.value}
                        onBlur={field.onBlur}
                        maxFractionDigits={2}
                        onValueChange={(e) => field.onChange(e)}
                        useGrouping={false}
                        min={0}
                        max={14}
                        inputClassName={classNames({
                          "p-invalid": fieldState.error,
                        })}
                      />
                    </div>
                    <div className="col-5">
                      {getFormErrorMessage(field.name)}
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="align-form-inputs">
              <Controller
                name="turbidity"
                control={control}
                rules={{
                  required: "Enter a valid Turbidity.",
                  validate: (value) =>
                    (value >= 0 && value <= 14) || "Enter a valid Turbidity.",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="grid align-items-center">
                      <div className="col-3 ">
                        <label htmlFor={field.name}>Turbidity</label>
                      </div>
                      <div className="col-4 ">
                        <InputNumber
                          id={field.name}
                          inputRef={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          maxFractionDigits={2}
                          onValueChange={(e) => field.onChange(e)}
                          useGrouping={false}
                          min={0}
                          max={14}
                          inputClassName={classNames({
                            "p-invalid": fieldState.error,
                          })}
                        />
                      </div>
                      <div className="col-5">
                        {getFormErrorMessage(field.name)}
                      </div>
                    </div>
                  </>
                )}
              />
            </div>
            <div className="align-form-inputs">
              <Controller
                name="dissolvedOxygen"
                control={control}
                rules={{
                  required: "Enter a valid Dissolved Oxygen.",
                  validate: (value) =>
                    (value >= 0 && value <= 14) ||
                    "Enter a valid Dissolved Oxygen.",
                }}
                render={({ field, fieldState }) => (
                  <div className="grid align-items-center">
                    <div className="col-3 ">
                      <label htmlFor={field.name}>Dissolved Oxygen</label>
                    </div>
                    <div className="col-4 ">
                      <InputNumber
                        id={field.name}
                        inputRef={field.ref}
                        value={field.value}
                        onBlur={field.onBlur}
                        maxFractionDigits={2}
                        onValueChange={(e) => field.onChange(e)}
                        useGrouping={false}
                        min={0}
                        max={14}
                        inputClassName={classNames({
                          "p-invalid": fieldState.error,
                        })}
                      />
                    </div>
                    <div className="col-5">
                      {getFormErrorMessage(field.name)}
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="align-form-inputs">
              <Controller
                name="totalMicrocystis"
                control={control}
                rules={{
                  required: "Enter a valid Total Microcystis.",
                  validate: (value) =>
                    (value >= 0 && value <= 14) ||
                    "Enter a valid Total Microcystis value.",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="grid align-items-center">
                      <div className="col-3 ">
                        <label htmlFor={field.name}>Total Microcystis</label>
                      </div>
                      <div className="col-4 ">
                        <InputNumber
                          id={field.name}
                          inputRef={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          maxFractionDigits={2}
                          onValueChange={(e) => field.onChange(e)}
                          useGrouping={false}
                          min={0}
                          max={14}
                          inputClassName={classNames({
                            "p-invalid": fieldState.error,
                          })}
                        />
                      </div>
                      <div className="col-5">
                        {getFormErrorMessage(field.name)}
                      </div>
                    </div>
                  </>
                )}
              />
            </div>
            <div className="align-form-inputs">
              <Controller
                name="mycEMicrocystis"
                control={control}
                rules={{
                  required: "Enter a valid mycE Microcystis.",
                  validate: (value) =>
                    (value >= 0 && value <= 14) ||
                    "Enter a valid mycE Microcystis.",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="grid align-items-center">
                      <div className="col-3 ">
                        <label htmlFor={field.name}>mycE Microcystis</label>
                      </div>
                      <div className="col-4 ">
                        <InputNumber
                          id={field.name}
                          inputRef={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          maxFractionDigits={2}
                          onValueChange={(e) => field.onChange(e)}
                          useGrouping={false}
                          min={0}
                          max={14}
                          inputClassName={classNames({
                            "p-invalid": fieldState.error,
                          })}
                        />
                      </div>
                      <div className="col-5">
                        {getFormErrorMessage(field.name)}
                      </div>
                    </div>
                  </>
                )}
              />
            </div>
            <div className="align-form-inputs">
              <Controller
                name="mycEPlanktothrix"
                control={control}
                rules={{
                  required: "Enter a valid mycE Planktothrix.",
                  validate: (value) =>
                    (value >= 0 && value <= 14) ||
                    "Enter a valid mycE Planktothrix.",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="grid align-items-center">
                      <div className="col-3 ">
                        <label htmlFor={field.name}>mycE Planktothrix</label>
                      </div>
                      <div className="col-4 ">
                        <InputNumber
                          id={field.name}
                          inputRef={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          maxFractionDigits={2}
                          onValueChange={(e) => field.onChange(e)}
                          useGrouping={false}
                          min={0}
                          max={14}
                          inputClassName={classNames({
                            "p-invalid": fieldState.error,
                          })}
                        />
                      </div>
                      <div className="col-5">
                        {getFormErrorMessage(field.name)}
                      </div>
                    </div>
                  </>
                )}
              />
            </div>
            <div className="align-form-inputs">
              <Controller
                name="totalMicrocystins"
                control={control}
                rules={{
                  required: "Enter a valid Total Microcystins.",
                  validate: (value) =>
                    (value >= 0 && value <= 14) ||
                    "Enter a valid Total Microcystins.",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="grid align-items-center">
                      <div className="col-3 ">
                        <label htmlFor={field.name}>Total Microcystins</label>
                      </div>
                      <div className="col-4 ">
                        <InputNumber
                          id={field.name}
                          inputRef={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          maxFractionDigits={2}
                          onValueChange={(e) => field.onChange(e)}
                          useGrouping={false}
                          min={0}
                          max={14}
                          inputClassName={classNames({
                            "p-invalid": fieldState.error,
                          })}
                        />
                      </div>
                      <div className="col-5">
                        {getFormErrorMessage(field.name)}
                      </div>
                    </div>
                  </>
                )}
              />
            </div>

            <Button label="Submit" type="submit" icon="pi pi-check" />
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default AddDataModal;
