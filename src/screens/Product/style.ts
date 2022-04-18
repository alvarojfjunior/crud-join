import { CreateStyle, StyleProps } from "_hooks/utils/useStyle";

const createStyle: CreateStyle = (theme) => {
    const style = {
        container: {
            backgroundColor: theme.colors.background,
            flex: 1,
        },
        spenner: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
        },
        title: {
            textAlign: 'center',
            fontSize: 30,
            marginBottom: 20,
            marginTop: 60
        },
        fab: {
            position: 'absolute',
            padding: 10,
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: theme.colors.primary,
        },
        modalContainer: {
            backgroundColor: theme.colors.backdrop,
            padding: 20,
            margin: 10,
            borderRadius: 20
        },
        modalTitle: {
            textAlign: 'center',
            fontSize: 30,
            marginBottom: 20,
            marginTop: 20,
            color: theme.colors.text,
        },
        input: {
            marginBottom: 10
        },
        buttonSave: {
            marginTop: 10,
            padding: 10,
            fontSize: 10,
            width: '45%',
        },
        buttonCancel: {
            marginTop: 10,
            padding: 10,
            width: '45%',
            backgroundColor: theme.colors.error
        },
        bottonsContainer: {
            flexDirection: "row",
            justifyContent: 'space-around',
        },
        picker: {
            backgroundColor: theme.colors.surface,
            marginBottom: 10,
            padding: 30,
            color: theme.colors.text,
        }
    };

    return style as StyleProps<typeof style>;
};

export default createStyle;
