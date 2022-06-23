import React, { useState } from "react";
import {
  List,
  Button,
  Modal as ModalAntd,
  notification,
} from "antd";
import {
  EditOutlined,
  UserDeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { deleteSubject } from "../../../../api/subject";
import UpdateSubjectForm from "../UpdateSubject";
import AddSubjectForm from "../AddSubjects";
import Modal from "../../../Modal";

const { confirm } = ModalAntd;

export default function ListSubjects(props) {
  const { subjects, setReloadSubjects } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addSubjectModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo usuario");
    setModalContent(
      <AddSubjectForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadSubjects={setReloadSubjects}
      />
    );
  };

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <List.Item
            actions={[
              <Button type="primary" onClick={addSubjectModal}>
                <UserAddOutlined />
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <span>
                  Asignaturas
                </span>
              }
            ></List.Item.Meta>
          </List.Item>
        </div>
      </div>


      <Subjects
        subjects={subjects}
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadSubjects={setReloadSubjects}
      />

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function Subjects(props) {
  const {
    subjects,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadSubjects,
  } = props;

  const editSubject = (subject) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${
        subject.academic_activity ? subject.academic_activity : "..."
      } ${subject.department ? subject.department : "..."}`
    );
    setModalContent(
      <UpdateSubjectForm
        subject={subject}
        setIsVisibleModal={setIsVisibleModal}
        setReloadSubjects={setReloadSubjects}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={subjects}
      renderItem={(subject) => (
        <Subject
          subject={subject}
          editSubject={editSubject}
          setReloadSubjects={setReloadSubjects}
        />
      )}
    />
  );
}

function Subject(props) {
  const { subject, editSubject, setReloadSubjects } = props;

  const showDeleteConfirm = () => {

    confirm({
      title: "Eliminando asignatura",
      content: `¿Estas seguro que quieres eliminar a ${subject.academic_activity}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteSubject(subject._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadSubjects(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editSubject(subject)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <UserDeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={`
                ${
                  subject.academic_activity ? subject.academic_activity : "..."
                } /
                ${subject.department ? subject.department : "..."}
            `}
        description={subject.email}
      />
    </List.Item>
  );
}
