import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

import styled from 'styled-components';
import { colors } from '../../../assests/styles/colors';
import { ReactComponent as IconAddPhoto } from '../../../assests/images/iconAddPhoto.svg';
import React from "react";

const ImgLoad = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  object-fit: cover;
  opacity: 0.5;
`;

const ErrorMessage = styled.p`
  color: ${colors.lightRed};
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
`;

const CustomImgInputContainer = styled.div`
  display: flex;
  max-width: 336px;
  width: 100%;
  height: 262px;
  margin-bottom: 48px;
  background-color: ${colors.lightGrey};
  border-radius: 15px;
  position: relative;
`;

const CustomFileInputIcon = styled(IconAddPhoto)`
  position: absolute;
  z-index: 25;
  opacity: 0.7;
  max-height: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CustomStyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 100;
`;

export type ControlledInputFileProps<TFieldValues extends FieldValues> = {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    errorMessage: any;
} & Omit<any, 'onChange' | 'value' | 'id'>;

export const ControlledInputFile = <TFieldValues extends FieldValues>({
                                                                          name,
                                                                          control,
                                                                          errorMessage,
                                                                          ...rest
                                                                      }: ControlledInputFileProps<TFieldValues>) => {
    const {
        field: { onChange, onBlur, value, ref },
    } = useController({
        name,
        control,
    });

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        onChange(file || null);
    };

    return (
        <CustomImgInputContainer>
            <CustomFileInputIcon />
            {value && <ImgLoad src={URL.createObjectURL(value)} alt="Selected Image" />}
            <CustomStyledInput type="file" accept="image/*" name={name} onChange={handleFileSelect} onBlur={onBlur} ref={ref} {...rest} />
            {errorMessage && true && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </CustomImgInputContainer>
    );
};