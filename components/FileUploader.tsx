"use client";

import { convertFileToUrl } from '@/lib/utils';
import Image from 'next/image';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void
}

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}
            className='file-upload'>
            <input {...getInputProps()} />
            {files && files?.length > 0 ? (
                <Image
                    src={convertFileToUrl(files[0])}
                    alt="Uploaded file"
                    width={1000}
                    height={1000}
                    className="max-h-[400px] overflow-hidden object-cover"
                />
            ) : (
                <>
                    <Image
                        src="/assets/icons/upload.svg"
                        alt="Upload file"
                        width={40}
                        height={40}
                    />
                    <div className='file-upload_label'>
                        <p className='text-14-regula'>
                            <span className='text-green-500'>Click to upload</span> or drag and drop files here
                        </p>
                        <p>
                            SVG, PNG, JPG, JPEG, or Gif [max 800x400]
                        </p>
                    </div>
                </>
            )}
        </div>
    )
}

export default FileUploader