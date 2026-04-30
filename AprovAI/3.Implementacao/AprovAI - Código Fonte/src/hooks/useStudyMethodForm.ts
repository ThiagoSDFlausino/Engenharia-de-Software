import { useState, useEffect } from 'react';
import type { StudyMethod, CreateStudyMethodDTO, StudyMethodCategory } from '../types';

interface UseStudyMethodFormProps {
  initialData?: StudyMethod;
  onSubmit: (data: CreateStudyMethodDTO) => Promise<void>;
}

export function useStudyMethodForm({ initialData, onSubmit }: UseStudyMethodFormProps) {
  const [formData, setFormData] = useState<CreateStudyMethodDTO>({
    name: '',
    description: '',
    duration: 30,
    category: 'tecnica-foco',
    benefits: [''],
    recommendedFor: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        duration: initialData.duration,
        category: initialData.category,
        benefits: initialData.benefits.length > 0 ? initialData.benefits : [''],
        recommendedFor: initialData.recommendedFor
      });
    }
  }, [initialData]);

  const updateField = <K extends keyof CreateStudyMethodDTO>(
    field: K,
    value: CreateStudyMethodDTO[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData(prev => ({ ...prev, benefits: newBenefits }));
  };

  const addBenefit = () => {
    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
  };

  const removeBenefit = (index: number) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      benefits: newBenefits.length > 0 ? newBenefits : ['']
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const filteredBenefits = formData.benefits.filter(b => b.trim() !== '');
      await onSubmit({ ...formData, benefits: filteredBenefits });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      duration: 30,
      category: 'tecnica-foco',
      benefits: [''],
      recommendedFor: ''
    });
  };

  return {
    formData,
    isSubmitting,
    updateField,
    updateBenefit,
    addBenefit,
    removeBenefit,
    handleSubmit,
    resetForm
  };
}
