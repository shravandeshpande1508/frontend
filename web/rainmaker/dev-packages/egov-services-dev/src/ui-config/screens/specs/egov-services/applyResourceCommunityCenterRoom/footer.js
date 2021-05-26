import {
    dispatchMultipleFieldChangeAction,
    getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { toggleSnackbar,prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import get from "lodash/get";

import {
    getCommonApplyFooter,
    generateBill,
    prepareRoomCard
} from "../../utils";
import "./index.css";
import { createUpdateRoomApplication } from "../../../../../ui-utils/commons";
import {
    getTenantId,
    setapplicationNumber,
} from "egov-ui-kit/utils/localStorageUtils";
import { set } from "lodash";

const moveToReview = (state, dispatch) => {
    let validateDocumentField = true;

    // const bkDate = get(
    //     state,
    //     "screenConfiguration.preparedFinalObject.Booking.bkDate"
    // );
    // const bkTime = get(
    //     state,
    //     "screenConfiguration.preparedFinalObject.Booking.bkTime"
    // );

    // const bkStatus = get(
    //     state,
    //     "screenConfiguration.preparedFinalObject.Booking.bkStatus"
    // );
    // if (bkStatus.includes("Paid")) {
    //     if (bkDate) {
    //         let currentTimestamp = new Date().getTime();
    //         const [year, month, day] = bkDate.split("-");
    //         const [hour, min] = bkTime.split(":");

    //         let bookingDateObj = new Date(year, parseInt(month, 10) - 1, day, hour, min);
    //         let bookingTimestamp = bookingDateObj.getTime();

    //         if (bookingTimestamp < currentTimestamp) {
    //             dispatch(
    //                 toggleSnackbar(
    //                     true,
    //                     { labelName: "You can not select Past Time!", labelKey: "" },
    //                     "warning"
    //                 )
    //             );
    //             validateDocumentField = false;
    //         } else {
    //             validateDocumentField = true;
    //         }
    //     } else {
    //         dispatch(
    //             toggleSnackbar(
    //                 true,
    //                 { labelName: "Please select Date!", labelKey: "" },
    //                 "warning"
    //             )
    //         );
    //         validateDocumentField = false;
    //     }
    // } else {
    //     validateDocumentField = true;
    // }

    return validateDocumentField;
}
const callBackForNext = async (state, dispatch) => {
    let errorMessage = "";
    let activeStep = get(
        state.screenConfiguration.screenConfig["applyCommunityCenterRoom"],
        "components.div.children.stepper.props.activeStep",
        0
    );
    let bookingData = get(
        state,
        "screenConfiguration.preparedFinalObject.Booking"
    );
    let isFormValid = false;
    let hasFieldToaster = true;

    let validatestepformflag = validatestepform(activeStep + 1);

    isFormValid = validatestepformflag[0];
    hasFieldToaster = validatestepformflag[1];
    //console.log(activeStep, "active Step Nero");
    //isFormValid = moveToReview(state, dispatch);
    if (activeStep === 2 && isFormValid != false) {
        isFormValid = moveToReview(state, dispatch);
    }
    if (activeStep === 2 && isFormValid != false) {
        
        let response = await createUpdateRoomApplication(
            state,
            dispatch,
            "INITIATE"
        );
        let roomApplicationNumber = get(
            response,
            "data.roomsModel[0].roomApplicationNumber",
            ""
        );
        if(response !== undefined){
                 
            if (response.data.timeslots && response.data.timeslots.length > 0) {
                if (response.data.timeslots && response.data.timeslots.length > 1) {
                    var [fromTime, toTimeOne] = response.data.timeslots[0].slot.split("-");
                    var [fromTimeTwo, toTime] = response.data.timeslots[1].slot.split("-");

                } else {

                    var [fromTime, toTime] = response.data.timeslots[0].slot.split("-");

                }

                let DisplayPaccObject = {
                    bkDisplayFromDateTime: response.data.bkFromDate + "#" + fromTime,
                    bkDisplayToDateTime: response.data.bkToDate + "#" + toTime,
                };
                
                if(fromTime.trim()=='9:00 AM' && toTime.trim()=='8:59 AM'){
                    
                    let d = new Date(new Date(response.data.bkToDate).setDate(new Date(response.data.bkToDate).getDate() + 1));
                    DisplayPaccObject = {
                        bkDisplayFromDateTime: response.data.bkFromDate + "#" + fromTime,  
                        bkDisplayToDateTime: d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate() + "#" + toTime,
                    };  
                }
                

                dispatch(
                    prepareFinalObject("DisplayTimeSlotData", DisplayPaccObject)
                );
            }
            let roomModel=  response.data.roomsModel
            let newRoomModel=   prepareRoomCard(roomModel)
            console.log('newRoomModel', newRoomModel)
            newRoomModel.map( (e)=>{
               if(e.roomApplicationNumber===roomApplicationNumber) {
                  dispatch(prepareFinalObject("roomDetailPageData", e));
        
               }
            })
          }
          
        let responseStatus = get(response, "status", "");
        if (responseStatus == "SUCCESS" || responseStatus == "success" || responseStatus == "200") {
            isFormValid = true;

            let tenantId = getTenantId().split(".")[0];
            let roomApplicationNumber = get(
                response,
                "data.roomsModel[0].roomApplicationNumber",
                ""
            );
            let businessService = "BOOKING_BRANCH_SERVICES.COMMUNITY_CENTRES_JHANJ_GHAR";
           
            const reviewUrl = `/egov-services/applyCommunityCenterRoom?applicationNumber=${roomApplicationNumber}&tenantId=${tenantId}&businessService=${businessService}`;
            dispatch(setRoute(reviewUrl));

            set(
                state.screenConfiguration.screenConfig["applyCommunityCenterRoom"],
                "components.div.children.headerDiv.children.header.children.applicationNumber.visible",
                true
            );
            // set(
            //     state.screenConfiguration.screenConfig["applyCommunityCenterRoom"],
            //     "components.div.children.formwizardForthStep.children.summaryDetails.children.cardContent.children.div.children.estimateSummary.visible",
            //     false
            // );
            await generateBill(
                state,
                dispatch,
                roomApplicationNumber,
                tenantId,
                businessService
            );

            
        } else {
            isFormValid = false;
            let errorMessage = {
                labelName: "Submission Falied, Try Again later!",
                labelKey: "", //UPLOAD_FILE_TOAST
            };
            dispatch(toggleSnackbar(true, errorMessage, "error"));
        }
    }
    if (activeStep === 3) {
        let applicationData = get(
            state.screenConfiguration.preparedFinalObject,
            "Booking"
        );
        const reviewUrl = `/egov-services/pay?applicationNumber=${applicationData.roomsModel[0].roomApplicationNumber}&tenantId=${applicationData.tenantId}&businessService=${applicationData.roomsModel[0].roomBusinessService}`;
        dispatch(setRoute(reviewUrl));
    }
    if (activeStep !== 3) {
        if (isFormValid) {
            changeStep(state, dispatch);
        } else if (hasFieldToaster) {
            errorMessage = {
                labelName: "Please fill all mandatory fields!",
                labelKey: "BK_ERR_FILL_ALL_MANDATORY_FIELDS",
            };
            switch (activeStep) {
                case 0:
                    errorMessage = {
                        labelName:
                            "Please check the Missing/Invalid field, then proceed!",
                        labelKey: "BK_ERR_FILL_ALL_MANDATORY_FIELDS",
                    };
                    break;
                case 1:
                    errorMessage = {
                        labelName:
                            "Please fill all mandatory fields, then proceed!",
                        labelKey: "BK_ERR_FILL_ALL_MANDATORY_FIELDS",
                    };
                    break;
            }
            dispatch(toggleSnackbar(true, errorMessage, "warning"));
        }
    }
};

export const changeStep = (
    state,
    dispatch,
    mode = "next",
    defaultActiveStep = -1
) => {
    let activeStep = get(
        state.screenConfiguration.screenConfig["applyCommunityCenterRoom"],
        "components.div.children.stepper.props.activeStep",
        0
    );
    let bookingData = get(
        state,
        "screenConfiguration.preparedFinalObject.Booking"
    );
    if (defaultActiveStep === -1) {
        activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
    } else {
        activeStep = defaultActiveStep;
    }

    const isPreviousButtonVisible = activeStep > 0 ? true : false;
    const isNextButtonVisible = activeStep < 3 ? true : false;
    const isPayButtonVisible = activeStep === 3 ? true : false;
    const actionDefination = [
        {
            path: "components.div.children.stepper.props",
            property: "activeStep",
            value: activeStep,
        },
        {
            path: "components.div.children.footer.children.previousButton",
            property: "visible",
            value: isPreviousButtonVisible,
        },
        {
            path: "components.div.children.footer.children.nextButton",
            property: "visible",
            value: isNextButtonVisible,
        },
        {
            path: "components.div.children.footer.children.payButton",
            property: "visible",
            value: isPayButtonVisible,
        },
    ];
    dispatchMultipleFieldChangeAction(
        "applyCommunityCenterRoom",
        actionDefination,
        dispatch
    );
    renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
    switch (activeStep) {
        case 0:
            dispatchMultipleFieldChangeAction(
                "applyCommunityCenterRoom",
                getActionDefinationForStepper(
                    "components.div.children.formwizardFirstStep"
                ),
                dispatch
            );
            break;
        case 1:
            dispatchMultipleFieldChangeAction(
                "applyCommunityCenterRoom",
                getActionDefinationForStepper(
                    "components.div.children.formwizardSecondStep"
                ),
                dispatch
            );
            break;
        case 2:
            dispatchMultipleFieldChangeAction(
                "applyCommunityCenterRoom",
                getActionDefinationForStepper(
                    "components.div.children.formwizardThirdStep"
                ),
                dispatch
            );
            break;   
        default:
            dispatchMultipleFieldChangeAction(
                "applyCommunityCenterRoom",
                getActionDefinationForStepper(
                    "components.div.children.formwizardForthStep"
                ),
                dispatch
            );
    }
};

export const getActionDefinationForStepper = (path) => {
    const actionDefination = [
        {
            path: "components.div.children.formwizardFirstStep",
            property: "visible",
            value: true,
        },
        {
            path: "components.div.children.formwizardSecondStep",
            property: "visible",
            value: false,
        },
        {
            path: "components.div.children.formwizardThirdStep",
            property: "visible",
            value: false,
        },
        {
            path: "components.div.children.formwizardForthStep",
            property: "visible",
            value: false,
        },
    ];
    for (var i = 0; i < actionDefination.length; i++) {
        actionDefination[i] = {
            ...actionDefination[i],
            value: false,
        };
        if (path === actionDefination[i].path) {
            actionDefination[i] = {
                ...actionDefination[i],
                value: true,
            };
        }
    }
    return actionDefination;
};

export const callBackForPrevious = (state, dispatch) => {
    changeStep(state, dispatch, "previous");
};

export const footer = getCommonApplyFooter({
    previousButton: {
        componentPath: "Button",
        props: {
            variant: "outlined",
            color: "primary",
            style: {
                // minWidth: "200px",
                height: "48px",
                marginRight: "16px",
            },
        },
        children: {
            previousButtonIcon: {
                uiFramework: "custom-atoms",
                componentPath: "Icon",
                props: {
                    iconName: "keyboard_arrow_left",
                },
            },
            previousButtonLabel: getLabel({
                labelName: "Previous Step",
                labelKey: "BK_COMMON_BUTTON_PREV_STEP",
            }),
        },
        onClickDefination: {
            action: "condition",
            callBack: callBackForPrevious,
        },
        visible: false,
    },
    nextButton: {
        componentPath: "Button",
        props: {
            variant: "contained",
            color: "primary",
            style: {
                // minWidth: "200px",
                height: "48px",
                marginRight: "45px",
            },
        },
        children: {
            nextButtonLabel: getLabel({
                labelName: "Next Step",
                labelKey: "BK_COMMON_BUTTON_NXT_STEP",
            }),
            nextButtonIcon: {
                uiFramework: "custom-atoms",
                componentPath: "Icon",
                props: {
                    iconName: "keyboard_arrow_right",
                },
            },
        },
        onClickDefination: {
            action: "condition",
            callBack: callBackForNext,
        },
    },
    payButton: {
        componentPath: "Button",
        props: {
            variant: "contained",
            color: "primary",
            style: {
                //minWidth: "200px",
                height: "48px",
                marginRight: "45px",
            },
        },
        children: {
            submitButtonLabel: getLabel({
                labelName: "Submit",
                labelKey: "BK_COMMON_BUTTON_SUBMIT",
            }),
            submitButtonIcon: {
                uiFramework: "custom-atoms",
                componentPath: "Icon",
                props: {
                    iconName: "keyboard_arrow_right",
                },
            },
        },
        onClickDefination: {
            action: "condition",
            callBack: callBackForNext,
        },
        visible: false,
    },
});

export const validatestepform = (activeStep, isFormValid, hasFieldToaster) => {
    let allAreFilled = true;
    document
        .getElementById("apply_form" + activeStep)
        .querySelectorAll("[required]")
        .forEach(function (i) {
            i.parentNode.classList.remove("MuiInput-error-853");
            i.parentNode.parentNode.classList.remove("MuiFormLabel-error-844");
            if (!i.value) {
                i.focus();
                allAreFilled = false;
                i.parentNode.classList.add("MuiInput-error-853");
                i.parentNode.parentNode.classList.add("MuiFormLabel-error-844");
            }
            if (i.getAttribute("aria-invalid") === "true" && allAreFilled) {
                i.parentNode.classList.add("MuiInput-error-853");
                i.parentNode.parentNode.classList.add("MuiFormLabel-error-844");
                allAreFilled = false;
                isFormValid = false;
                hasFieldToaster = true;
            }
        });

    document
        .getElementById("apply_form" + activeStep)
        .querySelectorAll("input[type='hidden']")
        .forEach(function (i) {
            i.parentNode.classList.remove("MuiInput-error-853");
            i.parentNode.parentNode.parentNode.classList.remove(
                "MuiFormLabel-error-844"
            );
            if (i.value == i.placeholder) {
                i.focus();
                allAreFilled = false;
                i.parentNode.classList.add("MuiInput-error-853");
                i.parentNode.parentNode.parentNode.classList.add(
                    "MuiFormLabel-error-844"
                );
                allAreFilled = false;
                isFormValid = false;
                hasFieldToaster = true;
            }
        });
    if (!allAreFilled) {
        isFormValid = false;
        hasFieldToaster = true;
    } else {
        isFormValid = true;
        hasFieldToaster = false;
    }
    return [isFormValid, hasFieldToaster];
};
