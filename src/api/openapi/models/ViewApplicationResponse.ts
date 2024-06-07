/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FarmerAnswer } from './FarmerAnswer';

export type ViewApplicationResponse = {
    /**
     * ID of the membership application
     */
    id?: string;
    /**
     * ID of the community farm
     */
    farmid?: string;
    /**
     * ID of the user who applied
     */
    userid?: string;
    /**
     * Contact person for the application
     */
    contact_person?: string;
    /**
     * URL of the selfie provided as proof
     */
    proof_selfie?: string;
    /**
     * URL of the valid ID provided
     */
    valid_id?: string;
    /**
     * Reason for applying
     */
    reason?: string;
    /**
     * Date and time of application creation
     */
    createdat?: string;
    /**
     * Date and time of last update
     */
    updatedat?: string;
    /**
     * Current status of the application
     */
    status?: string;
    /**
     * Additional remarks or notes
     */
    remarks?: string | null;
    /**
     * List of answers provided by the user
     */
    answers?: Array<FarmerAnswer>;
};