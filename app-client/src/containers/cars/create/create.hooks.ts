import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFileItem } from '../../../services/types';
import { ICars } from '../cars.types';

export default function useCreate() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<ICars | undefined>();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [fileItem, setFileItem] = useState<IFileItem | undefined>();

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      setLoadingSubmit(true);
      const payload = { ...formValues, image: fileItem };
      await axios.post('http://localhost:8000/api/cars', payload, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      navigate(-1);
    } catch (error) {
      console.log('error > ', error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        setLoadingImage(true);
        const formData = new FormData();
        formData.append('image', files[0]);

        const response = await axios.post(
          'http://localhost:8000/api/cars/upload',
          formData,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        setFileItem(response.data.data);
      } catch (error) {
        console.log('error > ', error);
      } finally {
        setLoadingImage(false);
      }
    }
  };

  return {
    handleSubmit,
    handleUploadImage,
    setFormValues,
    formValues,
    loadingImage,
    loadingSubmit,
    fileItem,
  };
}

