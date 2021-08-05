import { Form, Formik } from 'formik';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { createLeader } from '../../redux/leaders/leadersOperations';
import { modalAddLeadersOpenAction } from '../../redux/modalLeaders/modalLeadersActions';
import { IInitialLeader } from '../../redux/leaders/interfaces/leder.types';

import './modalAddLeaders.scss';

const initFormik = { name: '', score: 0 };

const ModalAddLeaders: React.FC = () => {
	const dispatch = useDispatch();
	const onToggleModal = () => dispatch(modalAddLeadersOpenAction());

	// Закрытие модалки по клику Backdrop
	const handleBackdropClick = (event: React.MouseEvent<HTMLInputElement>): void => {
		if (event.currentTarget === event.target) {
			onToggleModal();
		}
	};

	// Closing the modal by Escape
	useEffect(() => {
		const handleKeyDown = (e: { code: string }) => {
			if (e.code === 'Escape') {
				onToggleModal();
				window.removeEventListener('keydown', handleKeyDown);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
	}, [onToggleModal]);

	const handleSubmit = (leader: IInitialLeader) => {
		dispatch(createLeader(leader));
		onToggleModal();
	};

	return (
		<div role="button" tabIndex={0} className="modal-backdrop" onClick={handleBackdropClick}>
			<div className="wrapper-modal">
				<div className="modal">
					<div
						role="button"
						tabIndex={0}
						className="modal__close"
						onClick={onToggleModal}
						onKeyDown={onToggleModal}
					>
						x
					</div>
					<Formik initialValues={initFormik} onSubmit={leader => handleSubmit(leader)}>
						{({ values, handleChange, handleBlur, isSubmitting }) => (
							<Form className="modal__form">
								<h1 className="modal__form__text">Add user score</h1>
								<input
									className="modal__form__input"
									name="name"
									placeholder="Name:"
									type="text"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
								/>
								<input
									className="modal__form__input"
									type="number"
									name="score"
									placeholder="Score:"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.score}
								/>
								<button type="submit" disabled={isSubmitting} className="modal__form__button">
									Save
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default ModalAddLeaders;
