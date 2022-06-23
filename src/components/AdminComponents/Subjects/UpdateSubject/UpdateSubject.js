import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  notification,
} from "antd";
import { BookOutlined } from "@ant-design/icons";
import { updateSubject } from "../../../../api/subject";

import "./UpdateSubject.scss";

export default function UpdateSubjectForm(props) {
  const { subject, setIsVisibleModal, setReloadSubjects } = props;
  const [subjectData, setSubjectData] = useState({});

  useEffect(() => {
    setSubjectData({
      department: subject.department,
      academic_activity: subject.academic_activity,
      activity_code: subject.activity_code,
      number_credits: subject.number_credits,
      piaa_version: subject.piaa_version,
      theory_hours: subject.theory_hours,
      offsite_hours: subject.offsite_hours,
      hoursnon_attendance_reprovals: subject.hoursnon_attendance_reprovals,
      last_chance: subject.last_chance,
      duration_semester: subject.duration_semester,
      practical_hours: subject.practical_hours,
      presential_teacher_hours: subject.presential_teacher_hours,
      passing_score: subject.passing_score,
    });
  }, [subject]);

  const editSubject = () => {
    let subjectUpdate = subjectData;

    if (!subjectUpdate.department || !subjectUpdate.activity_code) {
      notification["error"]({
        message: "El departamento y el código  son obligatorios.",
      });
      return;
    }

    updateSubject(subjectUpdate, subject._id).then((result) => {
      notification["success"]({
        message: result.message,
      });
      setIsVisibleModal(false);
      setReloadSubjects(true);
    });
  };

  return (
    <div className="edit-subject-form">
      <EditForm
        subjectData={subjectData}
        setSubjectData={setSubjectData}
        updateSubject={editSubject}
      />
    </div>
  );
}

function EditForm(props) {
  const { subjectData, setSubjectData, updateSubject } = props;

  return (
    <Form className="form-edit" onFinish={updateSubject}>
      <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="Departamento"
                value={subjectData.department}
                onChange={(e) =>
                  setSubjectData({ ...subjectData, department: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="Nombre"
                value={subjectData.academic_activity}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    academic_activity: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
  
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="Código"
                value={subjectData.activity_code}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    activity_code: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="Créditos"
                value={subjectData.number_credits}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    number_credits: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
  
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="PIAA"
                value={subjectData.piaa_version}
                onChange={(e) =>
                  setSubjectData({ ...subjectData, piaa_version: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="Horas teóricas"
                value={subjectData.theory_hours}
                onChange={(e) =>
                  setSubjectData({ ...subjectData, theory_hours: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="Horas no presenciales"
                value={subjectData.offsite_hours}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    offsite_hours: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="Inasistencias"
                value={subjectData.hoursnon_attendance_reprovals}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    hoursnon_attendance_reprovals: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
  
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="Validación"
                value={subjectData.last_chance}
                onChange={(e) =>
                  setSubjectData({ ...subjectData, last_chance: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="Duración"
                value={subjectData.duration_semester}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    duration_semester: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="Horas practicas"
                value={subjectData.practical_hours}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    practical_hours: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="Horas presenciales"
                value={subjectData.presential_teacher_hours}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    presential_teacher_hours: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
  
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BookOutlined />}
                placeholder="Nota aprobatoria"
                value={subjectData.passing_score}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    passing_score: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Asignatura
        </Button>
      </Form.Item>
    </Form>
  );
}
