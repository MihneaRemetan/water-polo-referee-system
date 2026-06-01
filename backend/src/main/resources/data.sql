DROP TABLE IF EXISTS referee;
CREATE TABLE referee (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    city VARCHAR(100),
    gender VARCHAR(10),
    referee_rank VARCHAR(100),
    password VARCHAR(20)
);

INSERT INTO referee (id, name, city, gender, referee_rank, password) VALUES
(1, 'BĂLĂNESCU MIHAI', 'BUCUREȘTI', 'Masculin', 'Internațional', 'REF_01'),
(2, 'MANEA MANUEL', 'BUCUREȘTI', 'Masculin', 'Internațional', 'REF_02'),
(3, 'MUSTAȚĂ ALEXANDRU', 'BUCUREȘTI', 'Masculin', 'Internațional', 'REF_03'),
(4, 'GEORGESCU PAUL', 'BUCUREȘTI', 'Masculin', 'Internațional', 'REF_04'),
(5, 'DUMITRACHE TEODOR', 'BUCUREȘTI', 'Masculin', 'Internațional', 'REF_05'),
(6, 'MATEI GUIMAN ALEXIA', 'BUCUREȘTI', 'Feminin', 'Internațional', 'REF_06'),
(7, 'TOTH FERENC', 'TG. MUREȘ', 'Masculin', 'Internațional', 'REF_07'),
(8, 'ALEXANDRESCU MIHNEA', 'CLUJ-NAPOCA', 'Masculin', 'Internațional', 'REF_08'),
(9, 'BAIDOC COSMIN', 'ORADEA', 'Masculin', 'Internațional', 'REF_09'),
(10, 'SZEGHALMI KRISTINA', 'ORADEA', 'Feminin', 'Internațional', 'REF_10'),
(11, 'FEICA-PRODAN IOANA', 'ORADEA', 'Feminin', 'Internațional', 'REF_11'),
(12, 'LABONCZ NICOLETTE', 'ORADEA', 'Feminin', 'Internațional', 'REF_12'),
(13, 'SAVA DOMINIC', 'ORADEA', 'Masculin', 'Internațional', 'REF_13'),

(14, 'OPREA DRAGOȘ', 'BUCUREȘTI', 'Masculin', 'Național (CD)', 'BUC_14'),
(15, 'ȘERBAN GEORGE', 'BUCUREȘTI', 'Masculin', 'Național (CD)', 'BUC_15'),
(16, 'MIHAI COSMIN', 'BUCUREȘTI', 'Masculin', 'Național (CD)', 'BUC_16'),
(17, 'MARINESCU VALJEAN', 'BUCUREȘTI', 'Masculin', 'Național (CD)', 'BUC_17'),
(18, 'RADU GABRIEL', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_18'),
(19, 'POPESCU MARIUS', 'BUCUREȘTI', 'Feminin', 'Național (CJ)', 'BUC_19'),
(20, 'DEFTA ANDREI', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_20'),
(21, 'CATANĂ ALEXANDRU', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_21'),
(22, 'STOIAN MARIUS', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_22'),
(23, 'CHELU REBECCA', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_23'),
(24, 'HABELEA MICHAEL', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_24'),
(25, 'PORFIREANU VLAD', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_25'),
(26, 'ANDRA BUNEA', 'BUCUREȘTI', 'Feminin', 'Național (CJ)', 'BUC_26'),
(27, 'ALBU ALEXANDRU', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_27'),
(28, 'GIUCLEA BOGDAN', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_28'),
(29, 'STOIAN ROBERT', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_29'),
(30, 'STOENCIU IONUȚ', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_30'),
(31, 'GHIBAN ALEXANDRU', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_31'),
(32, 'CISMARU IONUȚ', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_32'),
(33, 'VRÂNCEANU CHELSEA', 'BUCUREȘTI', 'Feminin', 'Național (CJ/I)', 'BUC_33'),
(34, 'MELNICIUC ANASTASIA', 'BUCUREȘTI', 'Feminin', 'Național (CJ/I)', 'BUC_34'),
(35, 'NICULAE VALENTIN', 'BUCUREȘTI', 'Masculin', 'Național (S)', 'BUC_35'),
(36, 'BATIN ANDREI', 'BUCUREȘTI', 'Masculin', 'Național (CJ/I)', 'BUC_36'),
(37, 'GOANȚĂ DIMITRI', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_37'),
(38, 'LUCAS MATEI', 'BUCUREȘTI', 'Masculin', 'Național (CJ/I)', 'BUC_38'),
(39, 'DUMITRU BIANCA', 'BUCUREȘTI', 'Feminin', 'Național (CJ/I)', 'BUC_39'),
(40, 'RĂUREANU ALEXANDRU', 'BUCUREȘTI', 'Masculin', 'Național (CJ/I)', 'BUC_40'),
(41, 'SANDU ANDRA', 'BUCUREȘTI', 'Feminin', 'Național (CJ/I)', 'BUC_41'),

(42, 'TOTH DIANA', 'ORADEA', 'Feminin', 'Național (CJ)', 'ORA_42'),
(43, 'BARBUR TUDOR', 'ORADEA', 'Masculin', 'Național (CJ)', 'ORA_43'),
(44, 'TAMAȘ ANTONIA', 'ORADEA', 'Feminin', 'Național (CJ)', 'ORA_44'),
(45, 'HAȘAȘ ROLAND', 'ORADEA', 'Masculin', 'Național (CJ)', 'ORA_45'),
(46, 'NIRONCA ALEXEI', 'ORADEA', 'Masculin', 'Național (CJ)', 'ORA_46'),
(47, 'BIRO DOROTTYA', 'ORADEA', 'Feminin', 'Național (CJ/I)', 'ORA_47'),
(48, 'IGNAT PAUL', 'ORADEA', 'Masculin', 'Național (CJ/I)', 'ORA_48'),
(49, 'LORINCZ JASMIN', 'ORADEA', 'Feminin', 'Național (CJ/I)', 'ORA_49'),
(50, 'GORDAN LORENA', 'ORADEA', 'Feminin', 'Național (CJ/I)', 'ORA_50'),
(51, 'RIKH DAVID', 'ORADEA', 'Masculin', 'Național (CJ/I)', 'ORA_51'),
(52, 'BĂCUȚ CRISTIAN', 'ORADEA', 'Masculin', 'Național (CJ/I)', 'ORA_52'),
(53, 'ȚÎRLA OVIDIU', 'ORADEA', 'Masculin', 'Național (CJ/I)', 'ORA_53'),

(54, 'MISCHIAN MIRCEA', 'CLUJ-NAPOCA', 'Masculin', 'Național (CD)', 'CLU_54'),
(55, 'CIMPOEȘU VLAD', 'CLUJ-NAPOCA', 'Masculin', 'Național (CJ)', 'CLU_55'),
(56, 'TODEA TUDOR', 'CLUJ-NAPOCA', 'Masculin', 'Național (S)', 'CLU_56'),
(57, 'SILAGHI SARA', 'CLUJ-NAPOCA', 'Feminin', 'Național (CJ/I)', 'CLU_57'),
(58, 'ONIGĂ BOGDAN', 'CLUJ-NAPOCA', 'Masculin', 'Național (S)', 'CLU_58'),
(59, 'CĂLUȘ DAVID', 'CLUJ-NAPOCA', 'Masculin', 'Național (S)', 'CLU_59'),

(60, 'SZEGHALMI ANDREA', 'TG. MUREȘ', 'Feminin', 'Național (S)', 'MUR_60'),
(61, 'CRISTIAN ROBERT', 'TG. MUREȘ', 'Masculin', 'Național (CJ)', 'MUR_61'),
(62, 'MAER ANDREEA', 'TG. MUREȘ', 'Feminin', 'Național (CJ)', 'MUR_62'),
(63, 'CÂMPEAN ADRIAN', 'TG. MUREȘ', 'Masculin', 'Național (CJ)', 'MUR_63'),
(64, 'KOVACS ADRIENN', 'TG. MUREȘ', 'Feminin', 'Național (CJ)', 'MUR_64'),

(65, 'REMEȚAN MIHNEA', 'ARAD', 'Masculin', 'Național (ETA JTO/CJ)', 'ARA_65'),
(66, 'ȘOFRONICIU COSMIN', 'ARAD', 'Masculin', 'Național (CJ)', 'ARA_66'),

(67, 'IACOB DIANA MARIA', 'ALBA IULIA', 'Feminin', 'Național (CJ)', 'ALB_67'),
(68, 'GHERMAN OANA', 'ALBA IULIA', 'Feminin', 'Național (CJ)', 'ALB_68'),

(69, 'PETER SZABOLCS', 'BRAȘOV', 'Masculin', 'Național (CJ)', 'BRA_69'),

(70, 'LAZĂR VIOREL', 'FOCȘANI', 'Masculin', 'Național (CJ/I)', 'FOC_70'),
(71, 'LAZĂR MIRELA', 'FOCȘANI', 'Feminin', 'Național (CJ/I)', 'FOC_71');

DROP TABLE IF EXISTS observer;
CREATE TABLE observer (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    city VARCHAR(100),
    gender VARCHAR(10),
    observer_rank VARCHAR(100),
    password VARCHAR(50)
);

INSERT INTO observer (id, name, city, gender, observer_rank, password) VALUES
(201, 'ALEXANDRESCU ADRIAN', 'ORADEA', 'Masculin', 'Președinte', 'OBS_201'),
(202, 'DUNCA GHEORGHE', 'ORADEA', 'Masculin', 'Membru', 'OBS_202'),
(203, 'ANGELESCU IONUȚ', 'BUCUREȘTI', 'Masculin', 'Membru', 'OBS_203'),
(204, 'COJOCARIU BOGDAN', 'BUCUREȘTI', 'Masculin', 'Membru', 'OBS_204'),
(205, 'EDWARD ANDREI', 'BUCUREȘTI', 'Masculin', 'Membru', 'OBS_205'),
(206, 'FLORIAN DUMITRACHE', 'BUCUREȘTI', 'Masculin', 'Membru', 'OBS_206'),
(207, 'STANCU OCTAVIAN', 'BUCUREȘTI', 'Masculin', 'Membru', 'OBS_207'),
(208, 'NICOLAE DIACONU', 'BUCUREȘTI', 'Masculin', 'Membru', 'OBS_208'),
(209, 'MATACHE RADU', 'BUCUREȘTI', 'Masculin', 'Membru', 'OBS_209'),
(210, 'BROSOVSZKI ATTILA', 'ARAD', 'Masculin', 'Membru', 'OBS_210'),
(211, 'IONESCU RĂZVAN', 'ARAD', 'Masculin', 'Membru', 'OBS_211');