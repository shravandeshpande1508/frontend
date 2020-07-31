import { getCommonCard, getSelectField, getTextField, getDateField, getCommonTitle, getPattern, getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTodaysDateInYMD } from "../../utils";
import get from "lodash/get";
import { getDetailsFromProperty ,getDuplicateDetailsFromProperty} from "../../../../../ui-utils/apply";
export const propertyHeader = getCommonTitle(
    {
        labelName: "Property Details",
        labelKey: "RP_PROPERTY_DETAILS_HEADER"
    },
    {
        style: {
                marginBottom: 18,
                marginTop: 18
        }
    }
  )
  const rentHolderHeader = getCommonTitle(
    {
        labelName: "Rent holder Particulars",
        labelKey: "RP_RENT_HOLDER_PARTICULAR_HEADER"
    },
    {
        style: {
                marginBottom: 18,
                marginTop: 18
        }
    }
  )  
const fatherOrHusbandsNameField = {
    label: {
        labelName: "Father/ Husband's Name",
        labelKey: "TL_FATHER_OR_HUSBANDS_NAME_LABEL"
    },
    placeholder: {
        labelName: "Enter Father/ Husband's Name",
        labelKey: "TL_FATHER_OR_HUSBANDS_NAME_NAME_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 4,
    maxLength: 40,
    required: true,
    jsonPath: "Properties[0].owners[0].ownerDetails.fatherOrHusband"
}

const ownerNameField = {
    label: {
        labelName: "Owner Name",
        labelKey: "RP_OWNER_NAME_LABEL"
    },
    placeholder: {
        labelName: "Enter Owner Name",
        labelKey: "RP_OWNER_NAME_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 4,
    maxLength: 40,
    required: true,
    jsonPath: "Properties[0].owners[0].ownerDetails.name"
  }

const originalAllotteField = {
    label: {
        labelName: "Original Allottee",
        labelKey: "RP_ORIGINAL_ALLOTTEE_LABEL"
    },
    placeholder: {
        labelName: "Enter Original Allottee Name",
        labelKey: "RP_ORIGINAL_ALLOTTEE_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 4,
    maxLength: 40,
    jsonPath: "Properties[0].owners[0].ownerDetails.orignalAllottee"
}

const getDocumentField = {
    label: {
        labelName: "Documents Given",
        labelKey: "RP_DOCUMENTS_GIVEN_LABEL"
    },
    placeholder: {
        labelName: "Documents Given",
        labelKey: "RP_DOCUMENTS_GIVEN_LABEL"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 4,
    maxLength: 40,
    jsonPath: "Properties[0].owners[0].ownerDetails.documentsGiven" 
}

const getViolationField = {
    label: {
        labelName: "Violations",
        labelKey: "RP_VIOLATIONS_LABEL"
    },
    placeholder: {
        labelName: "Enter Comments",
        labelKey: "RP_VIOLATIONS_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 4,
    maxLength: 40,
    jsonPath: "Properties[0].owners[0].ownerDetails.violations" 
}

const getEditorField = {
    label: {
        labelName: "Editor",
        labelKey: "RP_EDITOR_LABEL"
    },
    placeholder: {
        labelName: "Editor",
        labelKey: "RP_EDITOR_LABEL"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 4,
    maxLength: 40,
    jsonPath: "Properties[0].owners[0].ownerDetails.editor" 
}

export const transitNumberConfig = {
    label: {
        labelName: "Transit Site/Plot number",
        labelKey: "RP_SITE_PLOT_LABEL"
    },
    placeholder: {
        labelName: "Enter Transit Site/Plot number",
        labelKey: "RP_SITE_PLOT_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 4,
    maxLength: 25,
    required: true,
}

const transitNumberField = {
    ...transitNumberConfig,
    jsonPath: "Properties[0].transitNumber"
  }

  const allotmentNumberField = {
    label: {
        labelName: "Allotment Number",
        labelKey: "RP_ALLOTMENT_NUMBER_LABEL"
    },
    placeholder: {
        labelName: "Enter Allotment Number",
        labelKey: "RP_ALLOTMENT_NUMBER_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 3,
    maxLength: 20,
    required: true,
    jsonPath: "Properties[0].owners[0].allotmenNumber"
  }  

  const memoDateField = {
        label: {
            labelName: "Memo Date",
            labelKey: "RP_MEMO_DATE_LABEL"
        },
        placeholder: {
            labelName: "Enter Memo Date",
            labelKey: "RP_MEMO_DATE_PLACEHOLDER"
        },
        pattern: getPattern("Date"),
        jsonPath: "Properties[0].owners[0].ownerDetails.memoDate",
        props: {
            inputProps: {
                max: getTodaysDateInYMD()
            }
        }
      }



const getOwnerDetailsForNotice = () => {
    return {
        header: rentHolderHeader,
        detailsContainer: getCommonContainer({
        fatherOrHusbandsName:getTextField(fatherOrHusbandsNameField),
        originalAllotte :getTextField(originalAllotteField),
        // documentsGiven:getTextField(getDocumentField),
        violations:getTextField(getViolationField),
        editor : getTextField(getEditorField),

    
        })
    }
}

export const ownerDetailsForNotice = getCommonCard(getOwnerDetailsForNotice())

const getPropertyDetailsForNotice = () => {
    return {
        header: propertyHeader,
        detailsContainer: getCommonContainer({
            transitNumber: getTextField(transitNumberField),
            allotmentNumber: getTextField(allotmentNumberField),
            memoDate: getDateField(memoDateField),

        })
    }
}


export const noticePropertyDetails = getCommonCard(getPropertyDetailsForNotice())