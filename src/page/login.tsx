import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '../components/button/button';
import { InputCheck } from '../components/input-check/input-check';
import { Input } from '../components/input/input';
import { useAppDispatch, useAppSelector } from '../services/store';
import { form, resetForm, setForm } from '../services/slices/formSlice';
import { validateForm } from '../utils/validate';

import styles from './login.module.scss';

const FIELD_NAMES = {
  FIRST_PLAYER: 'firstPlayer' as const,
  SECOND_PLAYER: 'secondPlayer' as const,
  IS_BOT: 'isBot' as const,
};

type FieldName = (typeof FIELD_NAMES)[keyof typeof FIELD_NAMES];

const INITIAL_TOUCHED = {
  firstPlayer: false,
  secondPlayer: false,
};

const INITIAL_ERRORS = {
  firstPlayer: '',
  secondPlayer: '',
};

export const LoginPage = () => {
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const [touched, setTouched] = useState(INITIAL_TOUCHED);

  const { firstPlayer, secondPlayer, isBot } = useAppSelector(form);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isHasError = Object.values(errors).some((error) => error !== '');

  useEffect(() => {
    dispatch(resetForm());
  }, [dispatch]);

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    const isFieldName = (name: string): name is FieldName => {
      return Object.values(FIELD_NAMES).includes(name as FieldName);
    };

    if (!isFieldName(name)) return;

    const inputValue = type === 'checkbox' ? checked : value;

    dispatch(
      setForm({
        field: name,
        value: inputValue,
      }),
    );
  };

  useEffect(() => {
    setErrors(validateForm({ firstPlayer, secondPlayer }, isBot));
  }, [firstPlayer, secondPlayer, isBot]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setTouched({ firstPlayer: true, secondPlayer: true });

    const newErrors = validateForm({ firstPlayer, secondPlayer }, isBot);
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== '')) return;
    navigate('/game');
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === FIELD_NAMES.FIRST_PLAYER || name === FIELD_NAMES.SECOND_PLAYER) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  return (
    <section className={styles.login}>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <div className={styles.login_inputs}>
          <Input
            title="1 игрок"
            value={firstPlayer}
            onChange={onFormChange}
            name="firstPlayer"
            error={touched.firstPlayer ? errors.firstPlayer : ''}
            onBlur={handleBlur}
          />
          <Input
            title="2 игрок"
            value={secondPlayer}
            onChange={onFormChange}
            name="secondPlayer"
            error={touched.secondPlayer ? errors.secondPlayer : ''}
            onBlur={handleBlur}
            isDisabled={isBot ? true : false}
          />
          <InputCheck
            isCheck={isBot}
            checked={isBot}
            onChange={onFormChange}
            name="isBot"
            isDisabled={secondPlayer ? true : false}
          />
        </div>
        <Button type="submit" disabled={isHasError}>
          Играть
        </Button>
      </form>
    </section>
  );
};
