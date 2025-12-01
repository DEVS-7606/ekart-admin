import React from "react";
import { Typography } from "../atoms/Typography";

interface LabelWithRequiredProps {
    text: string;
    required?: boolean;
    className?: string;
}

const LabelWithRequired: React.FC<LabelWithRequiredProps> = ({
    text,
    required = true,
    className = "",
}) => {
    return (
        <Typography component="p" variant="base" weight="medium" className={`flex items-center gap-1 ${className}`}>
            {text}
            {required && <Typography variant="base" weight="medium" className="text-red-500">*</Typography>}
        </Typography>
    );
};

export default LabelWithRequired;
