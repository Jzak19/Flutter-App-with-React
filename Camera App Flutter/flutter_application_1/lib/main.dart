import 'dart:io';

import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:path/path.dart' as path;
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:image_picker/image_picker.dart';

final storageRef = FirebaseStorage.instance.ref();
final imageRef = storageRef.child('contact-stock-1.jpg'); // Replace with your actual file path




void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  final cameras = await availableCameras();
  final firstCamera = cameras.first;
  runApp(MyApp(camera: firstCamera));
}

class MyApp extends StatefulWidget {
  final CameraDescription camera;

  const MyApp({super.key, required this.camera});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int currentPage = 1;

  final ImagePicker _picker = ImagePicker();

  // Method to pick an image from the gallery
  Future<File?> _pickImage() async {
    final XFile? pickedFile = await _picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      return File(pickedFile.path);
    } else {
      print('No image selected.');
      return null;
    }
  }

  Future<void> _uploadImage(File image) async {
    try {
      String fileName = path.basename(image.path);
      // Create a reference to the Firebase Storage bucket
      Reference storageRef = FirebaseStorage.instance.ref().child(fileName);

      // Upload the file
      UploadTask uploadTask = storageRef.putFile(image);

      // Wait until the upload is complete
      await uploadTask;

      // Get the download URL
      String downloadUrl = await storageRef.getDownloadURL();
      print('File uploaded. Download URL: $downloadUrl');
    } catch (e) {
      print('Error uploading image: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.blue,
          title: const Center(child: Text("Flutter Camera App")),
        ),
        body: currentPage == 0
            ? CameraPage(camera: widget.camera)
            : Center(
                child: FutureBuilder<List<String>>(
                  future: getAllImageUrls(),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const CircularProgressIndicator();
                    } else if (snapshot.hasError) {
                      return Text('Error!!!: ${snapshot.error}');
                    } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                      return const Text('No Images found');
                    } else {
                      print('${snapshot.data} <----');
                      // Displaying all images in a GridView
                      return GridView.builder(
                        shrinkWrap: true,
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 3, // Number of columns in the grid
                          crossAxisSpacing: 4.0,
                          mainAxisSpacing: 4.0,
                        ),
                        itemCount: snapshot.data!.length,
                        itemBuilder: (context, index) {
                          return Image.network(snapshot.data![index]);
                        },
                      );
                    }
                  },
                )
              ),
      
        floatingActionButton: currentPage == 0
            ? null
            : FloatingActionButton(
                backgroundColor: Colors.blue,
                onPressed: () async {
                // Pick an image
                File? image = await _pickImage();

                if (image != null) {
                  // Upload the image to Firebase Storage
                  await _uploadImage(image);
                  setState(() {
                    currentPage = 1;
                  });
                  }
                },
                child: const Icon(Icons.add)
              ),

        
        bottomNavigationBar: BottomNavigationBar(
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.camera), label: "Camera"),
            BottomNavigationBarItem(icon: Icon(Icons.image), label: "Images"),
          ],
          currentIndex: currentPage,
          onTap: (index) {
            setState(() {
              currentPage = index;
            });
            print(currentPage);
          },
        ),
      ),
    );
  }
}




class CameraPage extends StatefulWidget {

  final CameraDescription camera;

  const CameraPage({super.key, required this.camera});

  @override
  CameraPageState createState() => CameraPageState();
}

class CameraPageState extends State<CameraPage> {
  late CameraController _controller;
  late Future<void> _initializeControllerFuture;

  @override
  void initState() {
    super.initState();
    _controller = CameraController(
      widget.camera,
      ResolutionPreset.high,
    );

    _initializeControllerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _takePicture() async {
  try {
    // Ensure the camera is initialized
    await _initializeControllerFuture;

    // Attempt to take a picture and get the file
    final image = await _controller.takePicture();

    // Define the file path where the image will be saved
    final imagePath = '/storage/emulated/0/Pictures/${DateTime.now().millisecondsSinceEpoch}.png';

    // Save the picture permanently by copying it to the new path
    final imageFile = File(image.path);
    final savedImage = await imageFile.copy(imagePath);

    print('Picture saved to $imagePath');
  } catch (e) {
    print('Error: $e');
  }
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<void>(
        future: _initializeControllerFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            return CameraPreview(_controller);
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blue,
        onPressed: _takePicture,
        child: const Icon(Icons.camera),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}

Future<List<String>> getAllImageUrls() async {
  try {
    // Replace 'your-directory/' with the actual directory path where your images are stored
    final DirectoryReference = FirebaseStorage.instance.ref('');

    // Get the list of all items (files) in the directory
    final ListResult result = await DirectoryReference.listAll();

    // Initialize an empty list to store the download URLs
    List<String> imageUrls = [];

    // Iterate over each file in the directory and get the download URL
    for (Reference ref in result.items) {
      final String downloadUrl = await ref.getDownloadURL();
      imageUrls.add(downloadUrl);
    }

    return imageUrls;
  } catch (e) {
    print("Error getting image URLs: $e");
    return [];
  }
}
