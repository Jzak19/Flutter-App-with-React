// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter_test/flutter_test.dart';
import 'package:camera/camera.dart';
import 'package:flutter_application_1/main.dart'; // Import your main.dart file

void main() {
  testWidgets('MyApp should build without errors', (WidgetTester tester) async {
    // Create a mock camera
    final cameras = <CameraDescription>[];

    // Set up a fake camera
    const fakeCamera = CameraDescription(
      name: 'fake',
      lensDirection: CameraLensDirection.back,
      sensorOrientation: 0,
    );
    cameras.add(fakeCamera);

    // Initialize the app with the mock camera
    await tester.pumpWidget(const MyApp(camera: fakeCamera));

    // Wait for any async operations
    await tester.pumpAndSettle();

    // Add your test expectations here
    expect(find.text('Camera'), findsOneWidget);
  });
}