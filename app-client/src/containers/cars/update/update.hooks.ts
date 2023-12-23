import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { IFileItem } from '../../../services/types';
import { ICars } from '../cars.types';
import { useNavigate, useParams } from 'react-router-dom';

export function useUpdate() {
  const navigate = useNavigate();
  const params = useParams();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [fileItem, setFileItem] = useState<IFileItem>();
  const [formValues, setFormValues] = useState<ICars>({
    plate: '',
    manufacture: '',
    model: '',
    rentPerDay: 0,
    capacity: 0,
    description: '',
    availableAt: '',
    transmission: '',
    available: false,
    type: '',
    year: '',
    options: [''],
    specs: [''],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://app-server-ch8.fly.dev/api/cars/${params.id}`);
        setFileItem(response.data.data.image);
        setFormValues(response.data.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        setLoadingImage(true);
        const formData = new FormData();
        formData.append('image', files[0]);

        const response = await axios.post('http://app-server-ch8.fly.dev/api/cars/upload', formData, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        setFileItem(response.data.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoadingImage(false);
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
      const payload = { ...formValues, image: fileItem };

      await axios.put(`http://app-server-ch8.fly.dev/api/cars/${params.id}`, payload, {
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
    loadingImage,
    loadingSubmit,
    fileItem,
    handleUploadImage,
    handleFormChange,
    handleSubmit,
  };
}
