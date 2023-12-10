import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { IFileItem } from '../../../services/types';
import { ICars } from '../cars.types';
import { useNavigate, useParams } from 'react-router-dom';

export function useUpdate() {
  const navigate = useNavigate();
  const params = useParams();
  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [fileItem, setFileItem] = useState<IFileItem>();
  const [formValues, setFormValues] = useState<ICars>({
    name: '',
    price: 0,
    sizes_id: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cars/${params.id}`);
        setFileItem(response.data.data.photo);
        setFormValues(response.data.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleUploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        setLoadingPhoto(true);
        const formData = new FormData();
        formData.append('photo', files[0]);

        const response = await axios.post('http://localhost:8000/api/cars/upload', formData, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        setFileItem(response.data.data);
      } catch (error) {
        console.error('Error uploading photo:', error);
      } finally {
        setLoadingPhoto(false);
      }
    }
  };

  const handleFormChange = (field: keyof ICars, value: string | boolean) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      setLoadingSubmit(true);
      const payload = { ...formValues, photo: fileItem };

      await axios.put(`http://localhost:8000/api/cars/${params.id}`, payload, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log('Car details updated:', payload);
      navigate(-1);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoadingSubmit(false);
    }
  }

  return {
    formValues,
    setFormValues,
    loadingPhoto,
    loadingSubmit,
    fileItem,
    handleUploadPhoto,
    handleFormChange,
    handleSubmit,
  };
}
